// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Report Types
export interface Report {
  id: string;
  title: string;
  description?: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  templateId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  sections: TOCSection[];
}

// TOC & Section Types
export interface TOCSection {
  id: string;
  title: string;
  slug: string;
  level: 1 | 2 | 3;
  order: number;
  parentId?: string;
  children?: TOCSection[];
  content?: string;
  metadata?: SectionMetadata;
}

export interface SectionMetadata {
  wordCount?: number;
  lastEditedBy?: string;
  lastEditedAt?: string;
  isLocked?: boolean;
  lockedBy?: string;
}

export interface SectionContent {
  id: string;
  sectionId: string;
  content: string; // HTML content from TipTap
  version: number;
  createdAt: string;
  updatedAt: string;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  sections: TOCSection[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Asset Types
export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'signature' | 'map';
  url: string;
  thumbnailUrl?: string;
  size: number;
  mimeType: string;
  sectionId?: string;
  reportId: string;
  uploadedBy: string;
  createdAt: string;
}

// Export Types
export interface ExportOptions {
  format: 'pdf' | 'docx';
  scope: 'whole' | 'section';
  sectionSlug?: string;
  includeAppendices: boolean;
  includeTableOfContents: boolean;
}

// Version History
export interface VersionHistory {
  id: string;
  reportId: string;
  version: number;
  changes: string;
  createdBy: string;
  createdAt: string;
  snapshot?: string; // JSON snapshot of report at this version
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Editor State Types
export interface EditorState {
  activeSection: TOCSection | null;
  isSaving: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  isDirty: boolean;
  isReadOnly: boolean;
}
