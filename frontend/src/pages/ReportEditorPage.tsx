import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "@/components/dashboard/TopBar";
import ScrollableTOC from "@/components/dashboard/ScrollableTOC";
import ScrollableEditor from "@/components/editor/ScrollableEditor";
import ExportModal from "@/components/modals/ExportModal";
import { useEditorStore } from "@/store/editorStore";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import type { TOCSection, Report } from "@/types";
import { api } from "@/lib/api";

const ReportEditorPage = () => {
  const { id } = useParams();
  const {
    report,
    setReport,
    activeSection,
    setActiveSection,
    updateReportContent,
    updateHeader,
    updateFooter,
    setSaveStatus,
    isReadOnly,
  } = useEditorStore();
  const { sidebarOpen, rightPanelOpen } = useUIStore();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [tocSections, setTocSections] = useState<TOCSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await api.get<Report>(`/reports/${id}`);
        setReport(data);
        if (data.sections && data.sections.length > 0) {
          // If we have sections, set the first one as active
          // Note: Backend might return flat sections, we might need to process them for TOC
          // For now, assume they are compatible or handled by ScrollableTOC
          setTocSections(data.sections);
          setActiveSectionId(data.sections[0].id);
        } else if (data.content) {
          // If we have content but no sections metadata, we rely on the editor to generate TOC
          // So we start with empty TOC
          setTocSections([]);
        }
      } catch (error) {
        console.error("Failed to fetch report", error);
        // Add user-facing error
        alert(
          "Failed to load report. Check console for details or ensure backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [id, setReport]);

  const handleTOCChange = (sections: TOCSection[]) => {
    setTocSections(sections);
  };

  const handleContentChange = (content: string) => {
    updateReportContent(content);
  };

  const handleExportPdf = async () => {
    if (!report || !report.id) return;
    try {
      await api.download(
        `/export/report/${report.id}?format=pdf`,
        `${report.title}.pdf`
      );
    } catch (error) {
      console.error("Failed to export PDF", error);
    }
  };

  const handleExportDocx = async () => {
    if (!report || !report.id) return;
    try {
      await api.download(
        `/export/report/${report.id}?format=docx`,
        `${report.title}.docx`
      );
    } catch (error) {
      console.error("Failed to export Word", error);
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    // TODO: Implement actual API save call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveStatus("saved");
  };

  if (isLoading || !report) {
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
            sections={tocSections}
            activeSectionId={activeSectionId}
            onSelectSection={handleScrollToSection}
          />
        </aside>

        {/* Main Scrollable Editor Area */}
        <main
          ref={editorContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar bg-background"
          style={{ margin: "0", padding: "0 0 0 0" }}
        >
          <ScrollableEditor
            report={report}
            onContentChange={handleContentChange}
            onHeaderChange={updateHeader}
            onFooterChange={updateFooter}
            onSave={handleSave}
            isReadOnly={isReadOnly}
            onActiveSectionChange={(id) => setActiveSectionId(id)}
            containerRef={editorContainerRef}
            onTOCChange={handleTOCChange}
            onExportPdf={handleExportPdf}
            onExportDocx={handleExportDocx}
          />
        </main>
      </div>

      <ExportModal />
    </div>
  );
};

export default ReportEditorPage;
