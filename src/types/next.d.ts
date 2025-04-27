// types/next.d.ts
import type { NextApiRequest, NextApiResponse } from "next";

// 扩展 Response 数据类型
type Data = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => Promise<void>;
