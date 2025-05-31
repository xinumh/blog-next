// components/mdx.tsx
import type { MDXComponents } from "mdx/types";
import Callout from "./Callout";
import React, { ReactNode } from "react";

export const mdxComponents: MDXComponents = {
  Callout,
  a: (props) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  table: ({ children }) => (
    <table className="min-w-full border-collapse border border-gray-300">
      {children}
    </table>
  ),
  th: ({ children }) => (
    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left text-sm font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-300 px-4 py-2 text-sm">{children}</td>
  ),
  tr: ({ index, children }) => (
    <tr
      className={
        index % 2 === 1 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"
      }
    >
      {children}
    </tr>
  ),
  ul: ({ children }: { children: ReactNode }) => {
    const hasTaskListItem = React.Children.toArray(children).some((child) => {
      if (
        React.isValidElement(child) &&
        typeof child.props === "object" &&
        child.props !== null &&
        "className" in child.props
      ) {
        const className = child.props.className;
        return (
          typeof className === "string" && className.includes("task-list-item")
        );
      }
      return false;
    });

    if (hasTaskListItem) {
      return <ul className="task">{children}</ul>;
    }
    return (
      <ul className="list-disc notask list-inside space-y-2">{children}</ul>
    );
  },
  ol: ({ children }) => (
    <ol className="list-decimal notask list-inside space-y-2">{children}</ol>
  ),
  hr: () => <hr className="my-6 border-t border-gray-300" />,
  pre: (props) => (
    <pre className="my-6 bg-[#0d1117]/80 backdrop-blur-md text-gray-100 p-4 rounded overflow-auto">
      {props.children}
    </pre>
  ),
  // code: (props) => (
  //   <code className="text-pink-600 px-1 rounded">{props.children}</code>
  // ),
};
