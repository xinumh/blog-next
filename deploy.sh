#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 读取环境参数
ENV=$1

if [ -z "$ENV" ]; then
  echo -e "${RED}❌ No environment specified. Please run: ./deploy.sh dev OR ./deploy.sh prod${NC}"
  exit 1
fi

echo "🔵 Deploy environment: $ENV"

# 2. 加载正确的 .env 文件
if [ "$ENV" = "dev" ]; then
  ENV_FILE=".env.local"
elif [ "$ENV" = "prod" ]; then
  ENV_FILE=".env.production"
else
  echo -e "${RED}❌ Invalid environment: $ENV. Use 'dev' or 'prod'.${NC}"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}❌ Environment file $ENV_FILE not found.${NC}"
  exit 1
fi

echo "🔵 Loading environment variables from $ENV_FILE..."

export $(grep -v '^#' "$ENV_FILE" | xargs)

# 3. 检查 DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
  echo -e "${RED}❌ DATABASE_URL not set in $ENV_FILE.${NC}"
  exit 1
fi

echo "🔵 Checking database connection..."

# SQLite 特别注意是文件路径，不是 URL 格式，检查是不是 .db 文件
if [[ "$DATABASE_URL" != *".db"* ]]; then
  echo -e "${RED}⚠️ Warning: Your DATABASE_URL does not look like a SQLite file path: $DATABASE_URL${NC}"
  echo "Are you sure you want to continue? (yes/no)"
  read answer
  if [ "$answer" != "yes" ]; then
    echo -e "${RED}❌ Aborted.${NC}"
    exit 1
  fi
fi

# 4. 检查生产环境数据库是否存在
if [ "$ENV" = "prod" ]; then
  if [ ! -f "./prod.db" ]; then
    echo -e "${RED}❌ prod.db not found! Aborting.${NC}"
    exit 1
  fi

  # 备份 prod.db
  echo "🟠 [Backup] Backing up current prod.db..."
  cp ./prod.db ./prod.db.bak
  echo "🟢 [Backup] Backup completed: prod.db.bak"
fi

# 5. Drizzle Migrate
if [ "$ENV" = "dev" ]; then
  echo "🔵 [Step 1] Running drizzle-kit generate..."
  npx drizzle-kit generate --config=drizzle.config.ts
fi

echo "🔵 [Step 2] Running drizzle-kit push..."
# SQLite 不需要 echo yes，但为了兼容其他可能的未来提示，加管道
echo yes | npx drizzle-kit push --config=drizzle.config.ts

# 6. Next.js Build
echo "🟡 [Step 3] Building Next.js app..."
yarn build

# 7. Trigger Vercel Hook (only prod)
if [ "$ENV" = "prod" ]; then
  echo "🟢 [Step 4] Triggering Vercel Build Hook for production..."

  VERCEL_BUILD_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/prj_t0Kcw9U8YFN1wVqCeVplp6xiHJ1t/FW6XR3OIyE"

  curl -X POST "$VERCEL_BUILD_HOOK_URL"

  echo -e "${GREEN}✅ Production deploy triggered!${NC}"
else
  echo "🟡 Dev environment detected, skipping Vercel deploy trigger."
fi

echo -e "${GREEN}✅ Deploy script finished successfully!${NC}"