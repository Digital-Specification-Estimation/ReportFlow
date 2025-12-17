import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import ScrollableTOC from "@/components/dashboard/ScrollableTOC";
import ScrollableEditor from "@/components/editor/ScrollableEditor";
import ExportModal from "@/components/modals/ExportModal";
import { useEditorStore } from "@/store/editorStore";
import { useUIStore } from "@/store/uiStore";
import { mockReport } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import type { TOCSection } from "@/types";

const ReportEditorPage = () => {
  const { id } = useParams();
  const {
    report,
    setReport,
    activeSection,
    setActiveSection,
    updateSectionContent,
    setSaveStatus,
    isReadOnly,
  } = useEditorStore();
  const { sidebarOpen, rightPanelOpen } = useUIStore();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load report data (mock for now)
    setReport(mockReport);
    if (mockReport.sections.length > 0) {
      setActiveSection(mockReport.sections[0]);
      setActiveSectionId(mockReport.sections[0].id);
    }
  }, [id, setReport, setActiveSection]);

  const handleContentChange = (sectionId: string, content: string) => {
    updateSectionContent(sectionId, content);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveStatus("saved");
  };

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <span>Loading report...</span>
        </div>
      </div>
    );
  }

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element && editorContainerRef.current) {
      const container = editorContainerRef.current;
      const elementTop = element.offsetTop;
      const offset = 80; // Account for sticky header
      container.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopBar reportTitle={report.title} />

      <div className="flex-1 flex overflow-hidden">
        {/* TOC Sidebar - Fixed, doesn't scroll with content */}
        <aside
          className={cn(
            "w-64 border-r border-border bg-sidebar flex-shrink-0 transition-all duration-300 overflow-hidden flex flex-col",
            !sidebarOpen && "w-0 opacity-0"
          )}
        >
          <ScrollableTOC
            sections={report.sections}
            activeSectionId={activeSectionId}
            onSelectSection={handleScrollToSection}
          />
        </aside>

        {/* Main Scrollable Editor Area */}
        <main
          ref={editorContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar bg-background"
        >
          <ScrollableEditor
            report={report}
            onContentChange={handleContentChange}
            onSave={handleSave}
            isReadOnly={isReadOnly}
            onActiveSectionChange={setActiveSectionId}
            containerRef={editorContainerRef}
          />
        </main>
      </div>

      <ExportModal />
    </div>
  );
};

export default ReportEditorPage;
