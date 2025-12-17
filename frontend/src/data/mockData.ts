import type { Report, Template, Asset, TOCSection } from '@/types';
import { appraisalSections } from './appraisalTemplate';

// Use the professional appraisal template sections
export const mockSections: TOCSection[] = appraisalSections;

export const mockReport: Report = {
  id: 'report-1',
  title: 'Residential Appraisal Report - 10 Lindsay Street',
  description: 'Comprehensive residential property appraisal for mortgage lending purposes',
  status: 'draft',
  templateId: 'template-1',
  createdBy: 'user-1',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  version: 3,
  sections: mockSections,
};

export const mockTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Residential Appraisal',
    description: 'Standard template for single-family residential property appraisals',
    category: 'Residential',
    isDefault: true,
    createdBy: 'system',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    sections: mockSections,
  },
];

export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Front Exterior.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200',
    size: 245000,
    mimeType: 'image/jpeg',
    reportId: 'report-1',
    sectionId: 'sec-2',
    uploadedBy: 'user-1',
    createdAt: '2024-01-16T09:00:00Z',
  },
  {
    id: 'asset-2',
    name: 'Living Room.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200',
    size: 198000,
    mimeType: 'image/jpeg',
    reportId: 'report-1',
    sectionId: 'sec-2-3-1',
    uploadedBy: 'user-1',
    createdAt: '2024-01-16T09:05:00Z',
  },
  {
    id: 'asset-3',
    name: 'Kitchen.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200',
    size: 312000,
    mimeType: 'image/jpeg',
    reportId: 'report-1',
    sectionId: 'sec-2-3-1',
    uploadedBy: 'user-1',
    createdAt: '2024-01-16T09:10:00Z',
  },
  {
    id: 'asset-4',
    name: 'Appraiser Signature.png',
    type: 'signature',
    url: '/signature.png',
    size: 15000,
    mimeType: 'image/png',
    reportId: 'report-1',
    uploadedBy: 'user-1',
    createdAt: '2024-01-16T09:15:00Z',
  },
];

export const mockReports: Report[] = [
  mockReport,
];
