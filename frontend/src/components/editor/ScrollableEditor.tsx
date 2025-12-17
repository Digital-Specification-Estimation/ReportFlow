import { useEffect, useRef, RefObject, useState, useCallback } from "react";
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

interface ScrollableEditorProps {
  report: Report;
  onContentChange: (sectionId: string, content: string) => void;
  onSave: () => void;
  isReadOnly?: boolean;
  onActiveSectionChange: (sectionId: string) => void;
  containerRef: RefObject<HTMLDivElement>;
}

interface SectionEditorProps {
  section: TOCSection;
  onContentChange: (content: string) => void;
  onSave: () => void;
  isReadOnly: boolean;
  level: number;
  onEditorReady?: (editor: Editor) => void;
}

const SectionEditor = ({
  section,
  onContentChange,
  onSave,
  isReadOnly,
  level,
  onEditorReady,
}: SectionEditorProps) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
    content: section.content || "<p></p>",
    editable: !isReadOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        onSave();
      }, 3000);
    },
  });

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (editor && section.content !== editor.getHTML()) {
      editor.commands.setContent(section.content || "<p></p>");
    }
  }, [section.content, editor]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="section-editor">
      <EditorContent editor={editor} />
    </div>
  );
};

const ScrollableEditor = ({
  report,
  onContentChange,
  onSave,
  isReadOnly = false,
  onActiveSectionChange,
  containerRef,
}: ScrollableEditorProps) => {
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
  const editorsRef = useRef<Map<string, Editor>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollPosition = container.scrollTop + 150; // Offset for header

      let currentSectionId: string | null = null;

      sectionRefs.current.forEach((element, sectionId) => {
        const rect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const elementTop = rect.top - containerRect.top + container.scrollTop;

        if (elementTop <= scrollPosition) {
          currentSectionId = sectionId;
        }
      });

      if (currentSectionId) {
        onActiveSectionChange(currentSectionId);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [containerRef, onActiveSectionChange]);

  const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    if (el) {
      sectionRefs.current.set(sectionId, el);
    } else {
      sectionRefs.current.delete(sectionId);
    }
  };

  const handleEditorReady = useCallback((sectionId: string, editor: Editor) => {
    editorsRef.current.set(sectionId, editor);
  }, []);

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && activeEditor) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          activeEditor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [activeEditor]);

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt("Enter image URL");
    if (url && activeEditor) {
      activeEditor.chain().focus().setImage({ src: url }).run();
    }
  }, [activeEditor]);

  const addTable = useCallback(() => {
    if (activeEditor) {
      activeEditor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }
  }, [activeEditor]);

  const addPageBreak = useCallback(() => {
    if (activeEditor) {
      activeEditor.chain().focus().setHardBreak().run();
      activeEditor
        .chain()
        .focus()
        .insertContent('<div class="page-break-marker"></div>')
        .run();
    }
  }, [activeEditor]);

  const handleSave = useCallback(() => {
    onSave();
  }, [onSave]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const renderSectionContent = (
    section: TOCSection,
    level: number = 1
  ): JSX.Element => {
    return (
      <div
        key={section.id}
        id={`section-${section.id}`}
        ref={setSectionRef(section.id)}
        className={cn("section-container", level === 1 && "page-break-before")}
        onFocus={() => {
          const editor = editorsRef.current.get(section.id);
          if (editor) setActiveEditor(editor);
        }}
        onClick={() => {
          const editor = editorsRef.current.get(section.id);
          if (editor) setActiveEditor(editor);
        }}
      >
        {/* Section Title - Only show if not cover page */}
        {section.id !== "cover-page" && (
          <div
            className={cn(
              "mb-6",
              level === 1 && "mt-0 pt-0 text-center",
              level === 2 && "mt-8",
              level === 3 && "mt-6"
            )}
          >
            <h1
              className={cn(
                "text-foreground font-serif",
                level === 1 && "text-3xl font-bold text-primary mb-6",
                level === 2 && "text-xl font-semibold text-gray-800",
                level === 3 && "text-lg font-medium text-muted-foreground"
              )}
              style={{
                fontFamily:
                  level === 1
                    ? "'Georgia', 'Times New Roman', serif"
                    : "'Inter', sans-serif",
                letterSpacing: level === 1 ? "1px" : "0.5px",
                textTransform: level === 1 ? "uppercase" : "none",
              }}
            >
              {section.title}
            </h1>
            {level === 1 && (
              <div
                style={{
                  width: "120px",
                  height: "3px",
                  background: "linear-gradient(90deg, #1e40af, #3b82f6)",
                  margin: "0 auto 40px auto",
                }}
              ></div>
            )}
          </div>
        )}

        {/* Section Editor */}
        <SectionEditor
          section={section}
          onContentChange={(content) => onContentChange(section.id, content)}
          onSave={onSave}
          isReadOnly={isReadOnly}
          level={level}
          onEditorReady={(editor) => handleEditorReady(section.id, editor)}
        />

        {/* Render children inline within the same page context */}
        {section.children && section.children.length > 0 && (
          <div className="mt-4">
            {section.children.map((child) =>
              renderSectionContent(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const [paginatedContent, setPaginatedContent] = useState<JSX.Element[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const createHeightBasedPages = () => {
      const pageHeight = 10 * 96; // 10 inches in pixels (96 DPI)
      const pageMargin = 64; // 2rem top + 2rem bottom
      const availableHeight = pageHeight - pageMargin;

      const pages: JSX.Element[] = [];
      let pageNumber = 1;

      // First, create cover page as page 1
      const coverSection = report.sections.find(
        (section) => section.id === "cover-page"
      );
      if (coverSection) {
        pages.push(
          <div key={`page-${pageNumber}`} className="word-page-container">
            <div className="page-content">
              <div dangerouslySetInnerHTML={{ __html: coverSection.content }} />
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-mono">
              Page {pageNumber}
            </div>
          </div>
        );
        pageNumber++;
      }

      // Then process all other sections (excluding cover page)
      const contentSections = report.sections.filter(
        (section) => section.id !== "cover-page"
      );
      const allElements: JSX.Element[] = [];

      contentSections.forEach((section) => {
        allElements.push(
          <div key={`${section.id}-title`} className="section-element">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              {section.title}
            </h2>
          </div>
        );

        allElements.push(
          <div key={`${section.id}-content`} className="section-element">
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        );

        if (section.children) {
          section.children.forEach((child) => {
            allElements.push(
              <div key={`${child.id}-subsection`} className="section-element">
                {renderSectionContent(child, 2)}
              </div>
            );
          });
        }
      });

      // Distribute content elements across pages with consistent height
      let currentPageElements: JSX.Element[] = [];
      let estimatedHeight = 0;

      const estimateElementHeight = (element: JSX.Element) => {
        const key = element.key as string;
        if (key?.includes("title")) return 80; // Section titles
        if (key?.includes("content")) return 200; // Section content
        if (key?.includes("subsection")) return 150; // Subsections
        return 100; // Default
      };

      allElements.forEach((element, index) => {
        const elementHeight = estimateElementHeight(element);

        // Check if adding this element would exceed page height
        if (
          estimatedHeight + elementHeight > availableHeight &&
          currentPageElements.length > 0
        ) {
          // Create new page with consistent height
          pages.push(
            <div key={`page-${pageNumber}`} className="word-page-container">
              <div className="page-content">{currentPageElements}</div>
              <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-mono">
                Page {pageNumber}
              </div>
            </div>
          );

          // Start new page
          currentPageElements = [element];
          estimatedHeight = elementHeight;
          pageNumber++;
        } else {
          // Add to current page
          currentPageElements.push(element);
          estimatedHeight += elementHeight;
        }

        // Handle last element
        if (
          index === allElements.length - 1 &&
          currentPageElements.length > 0
        ) {
          pages.push(
            <div key={`page-${pageNumber}`} className="word-page-container">
              <div className="page-content">{currentPageElements}</div>
              <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-mono">
                Page {pageNumber}
              </div>
            </div>
          );
        }
      });

      setPaginatedContent(pages);
    };

    createHeightBasedPages();
  }, [report.sections]);

  const handleAddTableToReport = (tableHtml: string, analysis: string) => {
    // Find the current active section or default to a suitable section
    const targetSectionId = "market-data"; // You can make this dynamic based on user selection
    const targetSection = report.sections.find((s) => s.id === targetSectionId);

    if (targetSection) {
      const newContent = `${targetSection.content}\n\n<div class="chatbot-added-content">\n<h4>AI-Generated Analysis</h4>\n${analysis}\n\n${tableHtml}\n</div>`;
      onContentChange(targetSectionId, newContent);
    }
  };

  const renderPages = (): JSX.Element[] => {
    return paginatedContent;
  };

  return (
    <div className="scrollable-editor-container bg-muted/30 min-h-full w-full">
      {/* Microsoft Word-style Ribbon */}
      {!isReadOnly && (
        <WordRibbon
          editor={activeEditor}
          onImageUpload={addImage}
          onImageFromUrl={addImageFromUrl}
          onTableInsert={addTable}
          onPageBreak={addPageBreak}
          onSave={handleSave}
          onPrint={handlePrint}
        />
      )}

      {/* Document Pages Container */}
      <div className="w-full px-4 py-4">
        <div className="word-document-continuous">
          {/* Render real page containers */}
          {renderPages()}
        </div>
      </div>

      {/* Floating Chatbot Button */}
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

      {/* Table Analysis Chatbot */}
      <TableAnalysisChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onAddTableToReport={handleAddTableToReport}
      />
    </div>
  );
};

export default ScrollableEditor;
