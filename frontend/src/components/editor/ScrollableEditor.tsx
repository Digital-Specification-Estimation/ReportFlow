import { useEffect, useState, useCallback, useMemo } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Focus from "@tiptap/extension-focus";
import Typography from "@tiptap/extension-typography";
import WordRibbon from "./WordRibbon";
import { cn } from "@/lib/utils";
import type { Report, TOCSection } from "@/types";
import TableAnalysisChatbot from "../chatbot/TableAnalysisChatbot";
import { EditorProvider } from "./EditorContext";
import { generateDefaultTemplate } from "@/utils/templateGenerator";
import "@/styles/editor.css";

// Custom Extensions
import { CustomDocument } from "./extensions/CustomDocument";
import { HeadingWithId } from "./extensions/HeadingWithId";
import { Page } from "./extensions/Page";
import { Pagination } from "./extensions/Pagination";
import { FontSize } from "./extensions/FontSize";

interface ScrollableEditorProps {
  report: Report;
  onContentChange: (content: string) => void;
  onHeaderChange?: (content: string) => void;
  onFooterChange?: (content: string) => void;
  onSave: () => void;
  isReadOnly?: boolean;
  onActiveSectionChange: (sectionId: string) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  onTOCChange?: (sections: TOCSection[]) => void;
  onExportPdf: () => void;
  onExportDocx: () => void;
}

const ScrollableEditor = ({
  report,
  onContentChange,
  onHeaderChange,
  onFooterChange,
  onSave,
  isReadOnly = false,
  onActiveSectionChange,
  containerRef,
  onTOCChange,
  onExportPdf,
  onExportDocx,
}: ScrollableEditorProps) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [headerContent, setHeaderContent] = useState(report.header || "");
  const [footerContent, setFooterContent] = useState(report.footer || "");

  useEffect(() => {
    if (report.header !== undefined) {
      setHeaderContent(report.header);
    }
    if (report.footer !== undefined) {
      setFooterContent(report.footer);
    }
  }, [report.header, report.footer]);

  const handleHeaderChange = (content: string) => {
    setHeaderContent(content);
    onHeaderChange?.(content);
  };

  const handleFooterChange = (content: string) => {
    setFooterContent(content);
    onFooterChange?.(content);
  };

  // Prepare initial content by merging sections or using report.content
  // We treat the document as a single flow.
  // Memoize this to prevent infinite render loops
  const initialContent = useMemo(() => {
    // If we have the new full content field with actual content, use it
    if (report.content && report.content.trim() !== "") {
      return report.content;
    }

    // Check if sections have any actual content (not just empty sections)
    const hasActualContent =
      report.sections &&
      report.sections.length > 0 &&
      report.sections.some(
        (section) => section.content && section.content.trim() !== ""
      );

    if (hasActualContent) {
      // If the first section already contains pages (saved with new editor), return it.
      // We assume if the first section has "data-type='page'", it's the full document.
      if (
        report.sections[0].content &&
        report.sections[0].content.includes('data-type="page"')
      ) {
        return report.sections[0].content;
      }

      // Legacy content: Merge all sections
      const merged = report.sections
        .map((section) => {
          // We can inject headings based on section titles if they are missing
          const titleHtml = `<h1 id="${section.id}">${section.title}</h1>`;
          return `${titleHtml}${section.content || ""}`;
        })
        .join("");

      return `<div data-type="page">${merged}</div>`;
    }

    // For new documents or empty documents, use the beautiful template
    return generateDefaultTemplate();
  }, [report.id, report.content, report.sections]);

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Page,
      Pagination,
      StarterKit.configure({
        document: false, // Disable default document node
        heading: false, // Disable default heading
      }),
      HeadingWithId.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Underline,
      TextStyle,
      FontFamily.configure({ types: ["textStyle"] }),
      FontSize.configure({ types: ["textStyle"] }),
      Color.configure({ types: ["textStyle"] }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full cursor-pointer",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-collapse table-auto w-full",
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-gray-300 p-2 min-w-[100px]",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-gray-300 p-2 bg-gray-50 font-semibold",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Typography,
      Placeholder.configure({
        placeholder: "Start writing your document...",
      }),
    ],
    content: initialContent,
    editable: !isReadOnly,
    onUpdate: ({ editor }) => {
      // Save the full document content
      onContentChange(editor.getHTML());
    },
  });

  // Handle TOC Updates
  useEffect(() => {
    if (!editor || !onTOCChange) return;

    const updateTOC = () => {
      const rootSections: TOCSection[] = [];
      const stack: { section: TOCSection; level: number }[] = [];

      // Traverse document to find headings
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          // We use a generated ID if not present.
          // Note: Ideally we should persist IDs in the document.
          const id = node.attrs.id || `heading-${pos}`;
          const level = node.attrs.level;

          const section: TOCSection = {
            id: id,
            title: node.textContent,
            level: level as 1 | 2 | 3,
            order: rootSections.length, // Logic might need adjustment for nested order
            slug: id,
            children: [],
            content: "",
          };

          // Find parent
          while (stack.length > 0 && stack[stack.length - 1].level >= level) {
            stack.pop();
          }

          if (stack.length === 0) {
            rootSections.push(section);
          } else {
            const parent = stack[stack.length - 1].section;
            parent.children = parent.children || [];
            parent.children.push(section);
          }

          stack.push({ section, level });
        }
      });

      onTOCChange(rootSections);
    };

    updateTOC();

    // Subscribe to updates
    editor.on("update", updateTOC);

    return () => {
      editor.off("update", updateTOC);
    };
  }, [editor, onTOCChange]);

  // Handle click navigation from TOC links
  useEffect(() => {
    if (!editor) return;

    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.href.includes("#")) {
        event.preventDefault();
        const id = target.href.split("#")[1];
        const element = document.getElementById(id);
        if (element && containerRef.current) {
          const container = containerRef.current;
          const elementTop = element.offsetTop;
          const offset = 120; // Account for sticky header and ribbon
          container.scrollTo({
            top: elementTop - offset,
            behavior: "smooth",
          });
        }
      }
    };

    // Add event listener to the editor content
    const editorElement = editor.view.dom;
    editorElement.addEventListener("click", handleLinkClick);

    return () => {
      editorElement.removeEventListener("click", handleLinkClick);
    };
  }, [editor, containerRef]);

  // Handle Scroll to Section
  useEffect(() => {
    // We need to implement scroll logic based on Headings in the single editor
    // This requires finding the H1 with the section ID.
    // The legacy "sections" might not map 1:1 if user edited the text.
    // But we added IDs to H1s in getMergedContent.
  }, []);

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && editor) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt("Enter image URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }
  }, [editor]);

  const addPageBreak = useCallback(() => {
    if (editor) {
      // With our pagination, a "Page Break" means forcing a new page.
      // We can implement this by inserting a Page node, or a HardBreak with a specific class?
      // Since we use 'page' nodes, we should split the current page.
      // This is tricky from a button without custom logic.
      // For now, let's just insert a hard break.
      editor.chain().focus().setHardBreak().run();
    }
  }, [editor]);

  const handleSave = useCallback(() => {
    onSave();
  }, [onSave]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleAddTableToReport = (tableHtml: string, analysis: string) => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertContent(
          `
            <div class="chatbot-added-content">
                <h4>AI-Generated Analysis</h4>
                ${analysis}
                ${tableHtml}
            </div>
          `
        )
        .run();
    }
  };

  return (
    <EditorProvider
      value={{
        headerContent,
        setHeaderContent: handleHeaderChange,
        footerContent,
        setFooterContent: handleFooterChange,
      }}
    >
      <div className="scrollable-editor-container bg-gray-100 min-h-full w-full flex flex-col">
        {!isReadOnly && (
          <WordRibbon
            editor={editor}
            onImageUpload={addImage}
            onImageFromUrl={addImageFromUrl}
            onTableInsert={addTable}
            onPageBreak={addPageBreak}
            onSave={handleSave}
            onPrint={handlePrint}
            onExportDocx={onExportDocx}
            onExportPdf={onExportPdf}
          />
        )}

        <div className="w-full" style={{ padding: "0", margin: "0" }}>
          <EditorContent editor={editor} className="word-editor-content" />
        </div>

        {!isReadOnly && (
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-40"
            title="AI Table Analysis Assistant"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        )}

        <TableAnalysisChatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          onAddTableToReport={handleAddTableToReport}
        />
      </div>
    </EditorProvider>
  );
};

export default ScrollableEditor;
