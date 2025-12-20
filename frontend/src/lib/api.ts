// API Configuration and Base Client
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    const authStorage = localStorage.getItem('reportflow-auth');
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.token || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options;
    
    const token = this.getToken();
    const isDemo = token?.startsWith('demo-token');
    
    if (isDemo) {
      // Mock responses for demo mode (frontend-only)
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      if (endpoint === '/reports/new') {
        return { id: `demo-report-${Date.now()}`, title: 'New Report', content: '' } as T; // Blank report for Word-like creation
      } else if (endpoint.startsWith('/templates')) {
        return [
          { id: 'demo-template-1', name: 'Professional Report', content: '<h1>Template Header</h1><p>Sample content</p>' },
          { id: 'demo-template-2', name: 'Business Proposal', content: '<h1>Proposal</h1><p>Details here</p>' }
        ] as T; // Mock templates for viewing
      } else if (endpoint.startsWith('/reports')) {
        return { id: endpoint.split('/')[2], title: 'Mock Report', content: '<p>Mock content</p>' } as T;
      }
      throw new ApiError(404, 'Mock endpoint not found in demo mode');
    }
    
    // Normal backend request if not demo
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (!skipAuth && token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiError(response.status, error.message || 'Request failed');
    }

    const text = await response.text();
    if (!text) return {} as T;
    
    return JSON.parse(text);
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  async download(endpoint: string, defaultFilename?: string, options: RequestOptions = {}): Promise<void> {
    const { skipAuth = false, ...fetchOptions } = options;
    
    const headers: HeadersInit = {
      ...fetchOptions.headers,
    };

    if (!skipAuth) {
      const token = this.getToken();
      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    // Try to get filename from Content-Disposition
    let filename = defaultFilename || 'download';
    const disposition = response.headers.get('Content-Disposition');
    if (disposition && disposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches != null && matches[1]) { 
        filename = matches[1].replace(/['"]/g, '');
      }
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: User; accessToken: string }>('/auth/login', { email, password }, { skipAuth: true }),
  
  register: (name: string, email: string, password: string) =>
    api.post<{ user: User; accessToken: string }>('/auth/register', { name, email, password }, { skipAuth: true }),
  
  logout: () => api.post('/auth/logout'),
  
  refresh: () => api.post<{ accessToken: string }>('/auth/refresh', undefined, { skipAuth: true }),
};

// Reports API
export const reportsApi = {
  getAll: () => api.get<Report[]>('/reports'),
  
  getOne: (id: string) => api.get<Report>(`/reports/${id}`),
  
  create: (data: CreateReportDto) => api.post<Report>('/reports', data),
  
  update: (id: string, data: UpdateReportDto) => api.patch<Report>(`/reports/${id}`, data),
  
  delete: (id: string) => api.delete(`/reports/${id}`),
};

// Sections API
export const sectionsApi = {
  getByReport: (reportId: string) => api.get<Section[]>(`/reports/${reportId}/sections`),
  
  getOne: (id: string) => api.get<Section>(`/sections/${id}`),
  
  create: (reportId: string, data: CreateSectionDto) =>
    api.post<Section>(`/reports/${reportId}/sections`, data),
  
  update: (id: string, data: UpdateSectionDto) => api.patch<Section>(`/sections/${id}`, data),
  
  delete: (id: string) => api.delete(`/sections/${id}`),
  
  reorder: (reportId: string, sections: { id: string; orderIndex: number; parentId?: string | null }[]) =>
    api.patch(`/reports/${reportId}/sections/reorder`, { sections }),
};

// Section Content API
export const sectionContentApi = {
  getLatest: (sectionId: string) => api.get<SectionContent>(`/sections/${sectionId}/content`),
  
  getVersions: (sectionId: string) => api.get<SectionContent[]>(`/sections/${sectionId}/content/versions`),
  
  save: (sectionId: string, content: string, format: 'HTML' | 'JSON' | 'MARKDOWN' = 'HTML') =>
    api.post<SectionContent>(`/sections/${sectionId}/content`, { content, format }),
};

// Templates API
export const templatesApi = {
  getAll: () => api.get<Template[]>('/templates'),
  
  getOne: (id: string) => api.get<Template>(`/templates/${id}`),
  
  create: (data: CreateTemplateDto) => api.post<Template>('/templates', data),
  
  update: (id: string, data: UpdateTemplateDto) => api.patch<Template>(`/templates/${id}`, data),
  
  delete: (id: string) => api.delete(`/templates/${id}`),
  
  applyToReport: (reportId: string, templateId: string) =>
    api.post(`/templates/apply/${reportId}`, { templateId }),
};

// Assets API
export const assetsApi = {
  getByReport: (reportId: string) => api.get<Asset[]>(`/reports/${reportId}/assets`),
  
  upload: async (reportId: string, file: File, sectionId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (sectionId) formData.append('sectionId', sectionId);
    
    const token = localStorage.getItem('reportflow-auth');
    const parsedToken = token ? JSON.parse(token).state?.token : null;
    
    const response = await fetch(`${API_BASE_URL}/assets/upload/${reportId}`, {
      method: 'POST',
      headers: parsedToken ? { Authorization: `Bearer ${parsedToken}` } : {},
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) throw new ApiError(response.status, 'Upload failed');
    return response.json() as Promise<Asset>;
  },
  
  delete: (id: string) => api.delete(`/assets/${id}`),
};

// Export API
export const exportApi = {
  toPdf: (reportId: string) => 
    api.post<{ url: string }>(`/export/${reportId}/pdf`),
  
  toDocx: (reportId: string) =>
    api.post<{ url: string }>(`/export/${reportId}/docx`),
};

// Types for API
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  createdAt: string;
  updatedAt: string;
}

interface Report {
  id: string;
  title: string;
  clientName: string;
  propertyAddress: string;
  effectiveDate: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  createdById: string;
  sections?: Section[];
}

interface Section {
  id: string;
  reportId: string;
  parentId: string | null;
  slug: string;
  title: string;
  orderIndex: number;
  type: 'TEXT' | 'TABLE' | 'IMAGE' | 'SIGNATURE' | 'APPENDIX' | 'CUSTOM';
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  children?: Section[];
  content?: SectionContent;
}

interface SectionContent {
  id: string;
  sectionId: string;
  version: number;
  format: 'HTML' | 'JSON' | 'MARKDOWN';
  content: string;
  createdAt: string;
  createdById: string;
}

interface Template {
  id: string;
  name: string;
  description: string | null;
  templateJson: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface Asset {
  id: string;
  reportId: string;
  sectionId: string | null;
  fileName: string;
  storagePath: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateReportDto {
  title: string;
  clientName: string;
  propertyAddress: string;
  effectiveDate: string;
}

interface UpdateReportDto {
  title?: string;
  clientName?: string;
  propertyAddress?: string;
  effectiveDate?: string;
  status?: 'DRAFT' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED' | 'ARCHIVED';
}

interface CreateSectionDto {
  title: string;
  slug: string;
  parentId?: string;
  orderIndex: number;
  type?: 'TEXT' | 'TABLE' | 'IMAGE' | 'SIGNATURE' | 'APPENDIX' | 'CUSTOM';
  metadata?: Record<string, unknown>;
}

interface UpdateSectionDto {
  title?: string;
  slug?: string;
  parentId?: string | null;
  orderIndex?: number;
  type?: 'TEXT' | 'TABLE' | 'IMAGE' | 'SIGNATURE' | 'APPENDIX' | 'CUSTOM';
  metadata?: Record<string, unknown>;
}

interface CreateTemplateDto {
  name: string;
  description?: string;
  templateJson: Record<string, unknown>;
}

interface UpdateTemplateDto {
  name?: string;
  description?: string;
  templateJson?: Record<string, unknown>;
}

export type {
  User,
  Report,
  Section,
  SectionContent,
  Template,
  Asset,
  CreateReportDto,
  UpdateReportDto,
  CreateSectionDto,
  UpdateSectionDto,
  CreateTemplateDto,
  UpdateTemplateDto,
};
