import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { useEditorContext } from "../EditorContext";
import { EditableArea } from "./EditableArea";

interface PageNodeViewProps {
  node: any;
  getPos: () => number;
  editor: any;
}

export const PageNodeView: React.FC<PageNodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const { headerContent, footerContent, setHeaderContent, setFooterContent } =
    useEditorContext();

  // Calculate page number based on node position in document
  // Cover page and TOC don't have page numbers, numbering starts from page 3
  let pageNumber = 1;
  let actualPageNumber = 0;
  try {
    const pos = getPos();
    if (typeof pos === "number") {
      const resolvedPos = editor.state.doc.resolve(pos);
      pageNumber = resolvedPos.index() + 1;
      // Page numbering starts from page 3 (after cover and TOC)
      actualPageNumber = pageNumber > 2 ? pageNumber - 2 : 0;
    }
  } catch (e) {
    // ignore
  }

  const isCoverPage = pageNumber === 1;
  const isTOCPage = pageNumber === 2;
  const showPageNumber = pageNumber > 2;

  return (
    <NodeViewWrapper
      className={`word-page-wrapper shadow-2xl bg-white print:shadow-none print:m-0 print:w-full transition-all duration-300 ${
        isCoverPage ? "cover-page" : ""
      }`}
      style={{
        width: "100%",
        height: "calc(100vh - 80px)",
        padding: isCoverPage ? "1.5rem 1rem" : "1rem",
        position: "relative",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: isCoverPage ? "center" : "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Header Area - Hidden on Cover Page and TOC */}
      {!isCoverPage && !isTOCPage && (
        <div className="page-header absolute top-0 left-0 right-0 h-[1in] p-4 text-xs text-gray-500 flex items-start justify-between border-b border-transparent hover:border-gray-200 transition-colors group">
          {/* Page Number - Top Left, Blue */}
          {showPageNumber && (
            <span className="font-mono text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded text-sm">
              Page {actualPageNumber}
            </span>
          )}
          <EditableArea
            content={headerContent || ""}
            onChange={setHeaderContent}
            disabled={!editor.isEditable}
            placeholder="Double click to add header"
            className="min-w-[200px] text-center outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
          />
          <div></div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`page-content min-h-[9in] ${
          isCoverPage
            ? "flex flex-col justify-center items-center text-center"
            : ""
        }`}
      >
        <NodeViewContent />
      </div>

      {/* Footer Area - Hidden on Cover Page and TOC */}
      {!isCoverPage && !isTOCPage && (
        <div className="page-footer absolute bottom-0 left-0 right-0 h-[1in] p-4 text-xs text-gray-500 flex items-start justify-center border-t border-transparent hover:border-gray-200 transition-colors group">
          <EditableArea
            content={footerContent || ""}
            onChange={setFooterContent}
            disabled={!editor.isEditable}
            placeholder="Double click to add footer"
            className="min-w-[200px] text-center outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
          />
        </div>
      )}
    </NodeViewWrapper>
  );
};
