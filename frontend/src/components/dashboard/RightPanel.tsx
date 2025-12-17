import { useState } from 'react';
import { X, Upload, Image, FileText, Trash2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/store/uiStore';
import { useEditorStore } from '@/store/editorStore';
import { mockAssets } from '@/data/mockData';
import type { Asset } from '@/types';
import { cn } from '@/lib/utils';

const RightPanel = () => {
  const { rightPanelTab, setRightPanelTab, setRightPanelOpen } = useUIStore();
  const { activeSection, report } = useEditorStore();
  const [assets] = useState<Asset[]>(mockAssets);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file upload logic here
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getAssetTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'signature':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-80 border-l border-border bg-background flex flex-col h-full">
      {/* Header */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        <Tabs value={rightPanelTab} onValueChange={(v) => setRightPanelTab(v as 'metadata' | 'assets')}>
          <TabsList className="h-8">
            <TabsTrigger value="metadata" className="text-xs px-3 h-7">
              Details
            </TabsTrigger>
            <TabsTrigger value="assets" className="text-xs px-3 h-7">
              Assets
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setRightPanelOpen(false)}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {rightPanelTab === 'metadata' ? (
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              {activeSection ? (
                <>
                  {/* Section Info */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Section Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Title</span>
                        <span className="font-medium">{activeSection.title}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Level</span>
                        <Badge variant="secondary" className="text-xs">
                          H{activeSection.level}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Slug</span>
                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          {activeSection.slug}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Section Metadata */}
                  {activeSection.metadata && (
                    <div>
                      <h3 className="text-sm font-medium mb-3">Metadata</h3>
                      <div className="space-y-3">
                        {activeSection.metadata.wordCount !== undefined && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Word Count</span>
                            <span>{activeSection.metadata.wordCount}</span>
                          </div>
                        )}
                        {activeSection.metadata.lastEditedBy && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Edited By</span>
                            <span>{activeSection.metadata.lastEditedBy}</span>
                          </div>
                        )}
                        {activeSection.metadata.lastEditedAt && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last Edited</span>
                            <span>
                              {new Date(activeSection.metadata.lastEditedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Report Info */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Report Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={report?.status === 'approved' ? 'default' : 'secondary'}
                          className="text-xs capitalize"
                        >
                          {report?.status || 'draft'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Version</span>
                        <span>v{report?.version || 1}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sections</span>
                        <span>{report?.sections.length || 0}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>
                          {report?.createdAt
                            ? new Date(report.createdAt).toLocaleDateString()
                            : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modified</span>
                        <span>
                          {report?.updatedAt
                            ? new Date(report.updatedAt).toLocaleDateString()
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Copy Section Link
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Section
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full flex flex-col">
            {/* Upload Area */}
            <div
              className={cn(
                'mx-4 mt-4 border-2 border-dashed rounded-lg p-4 text-center transition-colors',
                dragOver
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-muted-foreground/50'
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop files or{' '}
                <button className="text-accent hover:underline">browse</button>
              </p>
            </div>

            {/* Assets List */}
            <ScrollArea className="flex-1 mt-4">
              <div className="px-4 pb-4 space-y-2">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group transition-colors"
                  >
                    {asset.type === 'image' && asset.thumbnailUrl ? (
                      <img
                        src={asset.thumbnailUrl}
                        alt={asset.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        {getAssetTypeIcon(asset.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(asset.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="opacity-0 group-hover:opacity-100 h-7 w-7 text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
