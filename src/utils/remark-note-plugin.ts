// lib/remark-note-plugin.ts
import { visit } from "unist-util-visit";

export function remarkCustomNotes() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" &&
        ["tip", "warning", "danger"].includes(node.name)
      ) {
        const data = node.data || (node.data = {});
        data.hName = "Callout";
        data.hProperties = {
          type: node.name,
        };
      }
    });
  };
}
