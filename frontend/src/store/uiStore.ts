import { create } from 'zustand';

interface UIStore {
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  rightPanelTab: 'metadata' | 'assets';
  exportModalOpen: boolean;
  templateModalOpen: boolean;
  versionHistoryOpen: boolean;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleRightPanel: () => void;
  setRightPanelOpen: (open: boolean) => void;
  setRightPanelTab: (tab: 'metadata' | 'assets') => void;
  setExportModalOpen: (open: boolean) => void;
  setTemplateModalOpen: (open: boolean) => void;
  setVersionHistoryOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  rightPanelOpen: true,
  rightPanelTab: 'metadata',
  exportModalOpen: false,
  templateModalOpen: false,
  versionHistoryOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleRightPanel: () => set((state) => ({ rightPanelOpen: !state.rightPanelOpen })),
  setRightPanelOpen: (rightPanelOpen) => set({ rightPanelOpen }),
  setRightPanelTab: (rightPanelTab) => set({ rightPanelTab }),
  setExportModalOpen: (exportModalOpen) => set({ exportModalOpen }),
  setTemplateModalOpen: (templateModalOpen) => set({ templateModalOpen }),
  setVersionHistoryOpen: (versionHistoryOpen) => set({ versionHistoryOpen }),
}));
