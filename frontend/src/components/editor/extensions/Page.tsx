import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { PageNodeView } from "./PageNodeView";

export const Page = Node.create({
  name: "page",
  group: "block",
  content: "block+",
  defining: true,
  isolating: true,

  parseHTML() {
    return [{ tag: 'div[data-type="page"]' }, { tag: "div.page" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "page", class: "page" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PageNodeView);
  },
});
