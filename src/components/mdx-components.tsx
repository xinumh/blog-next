// components/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Callout from "./Callout";
// import Blockquote from "./Blockquote";

export const mdxComponents: MDXComponents = {
  Callout,
  a: (props) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  // blockquote: Blockquote,
  ul: (props) => <ul className="list-disc ml-6 space-y-1 " {...props} />,
  ol: (props) => <ol className="list-decimal ml-6 space-y-1" {...props} />,
};
