import React from "react";

// 可配置的 source -> 样式映射
const sourceColorMap: Record<string, string> = {
  百度热搜: "bg-red-500 text-white",
  新华网: "bg-pink-500 text-white",
  澎湃新闻: "bg-blue-500 text-white",
  中国气象局: "bg-green-500 text-white",
  国家应急广播: "bg-yellow-400 text-black",
  // 其他来源可继续添加
};

// 默认样式
const defaultStyle = "bg-gray-300 text-black";

/**
 * SourceTag
 * @param source string 来源名称，如 "百度热搜"
 * @returns JSX 标签组件，自动匹配颜色
 */
const SourceTag: React.FC<{ source: string; className?: string }> = ({
  source,
  className,
}) => {
  const colorClass = sourceColorMap[source] || defaultStyle;

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}
    >
      {source}
    </span>
  );
};

export default SourceTag;
