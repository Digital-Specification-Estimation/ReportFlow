import { create } from 'zustand';
import type { TOCSection, EditorState, Report } from '@/types';

interface EditorStore extends EditorState {
  report: Report | null;
  setReport: (report: Report | null) => void;
  setActiveSection: (section: TOCSection | null) => void;
  setSaveStatus: (status: EditorState['saveStatus']) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsReadOnly: (readOnly: boolean) => void;
  updateSectionContent: (sectionId: string, content: string) => void;
  updateReportContent: (content: string) => void;
  updateHeader: (content: string) => void;
  updateFooter: (content: string) => void;
  updateSectionOrder: (sections: TOCSection[]) => void;
  addSection: (parentId?: string) => void;
  removeSection: (sectionId: string) => void;
  renameSection: (sectionId: string, title: string) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  report: null,
  activeSection: null,
  isSaving: false,
  saveStatus: 'idle',
  lastSaved: undefined,
  isDirty: false,
  isReadOnly: false,

  setReport: (report) => set({ report }),

  setActiveSection: (section) => set({ activeSection: section }),

  setSaveStatus: (saveStatus) => {
    const updates: Partial<EditorStore> = { saveStatus };
    if (saveStatus === 'saving') {
      updates.isSaving = true;
    } else {
      updates.isSaving = false;
      if (saveStatus === 'saved') {
        updates.lastSaved = new Date();
        updates.isDirty = false;
      }
    }
    set(updates);
  },

  setIsDirty: (isDirty) => set({ isDirty }),

  setIsReadOnly: (isReadOnly) => set({ isReadOnly }),

  updateSectionContent: (sectionId, content) => {
    const { report } = get();
    if (!report) return;

    const updateSections = (sections: TOCSection[]): TOCSection[] => {
      return sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, content };
        }
        if (section.children) {
          return { ...section, children: updateSections(section.children) };
        }
        return section;
      });
    };

    set({
      report: { ...report, sections: updateSections(report.sections) },
      isDirty: true,
    });
  },

  updateReportContent: (content) => {
    const { report } = get();
    if (!report) return;
    set({
      report: { ...report, content },
      isDirty: true,
    });
  },

  updateHeader: (content) => {
    const { report } = get();
    if (!report) return;
    set({
      report: { ...report, header: content },
      isDirty: true,
    });
  },

  updateFooter: (content) => {
    const { report } = get();
    if (!report) return;
    set({
      report: { ...report, footer: content },
      isDirty: true,
    });
  },

  updateSectionOrder: (sections) => {
    const { report } = get();
    if (!report) return;
    set({ report: { ...report, sections }, isDirty: true });
  },

  addSection: (parentId) => {
    const { report } = get();
    if (!report) return;

    const newSection: TOCSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      slug: `new-section-${Date.now()}`,
      level: parentId ? 2 : 1,
      order: report.sections.length,
      parentId,
      content: '<p>Start writing here...</p>',
    };

    if (parentId) {
      const updateSections = (sections: TOCSection[]): TOCSection[] => {
        return sections.map((section) => {
          if (section.id === parentId) {
            return {
              ...section,
              children: [...(section.children || []), newSection],
            };
          }
          if (section.children) {
            return { ...section, children: updateSections(section.children) };
          }
          return section;
        });
      };
      set({ report: { ...report, sections: updateSections(report.sections) } });
    } else {
      set({ report: { ...report, sections: [...report.sections, newSection] } });
    }
  },

  removeSection: (sectionId) => {
    const { report, activeSection } = get();
    if (!report) return;

    const filterSections = (sections: TOCSection[]): TOCSection[] => {
      return sections
        .filter((section) => section.id !== sectionId)
        .map((section) => {
          if (section.children) {
            return { ...section, children: filterSections(section.children) };
          }
          return section;
        });
    };

    set({
      report: { ...report, sections: filterSections(report.sections) },
      activeSection: activeSection?.id === sectionId ? null : activeSection,
    });
  },

  renameSection: (sectionId, title) => {
    const { report } = get();
    if (!report) return;

    const updateSections = (sections: TOCSection[]): TOCSection[] => {
      return sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, title, slug: title.toLowerCase().replace(/\s+/g, '-') };
        }
        if (section.children) {
          return { ...section, children: updateSections(section.children) };
        }
        return section;
      });
    };

    set({ report: { ...report, sections: updateSections(report.sections) } });
  },
}));
