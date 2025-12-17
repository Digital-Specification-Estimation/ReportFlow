import { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUIStore } from '@/store/uiStore';
import { useEditorStore } from '@/store/editorStore';
import { toast } from 'sonner';
import type { ExportOptions } from '@/types';

const ExportModal = () => {
  const { exportModalOpen, setExportModalOpen } = useUIStore();
  const { report } = useEditorStore();

  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    scope: 'whole',
    includeAppendices: true,
    includeTableOfContents: true,
  });

  const handleExport = async () => {
    // Simulate export
    toast.loading('Preparing export...', { id: 'export' });
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast.success(`Report exported as ${exportOptions.format.toUpperCase()}!`, {
      id: 'export',
    });
    
    setExportModalOpen(false);
  };

  const sections = report?.sections || [];

  return (
    <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Report
          </DialogTitle>
          <DialogDescription>
            Choose your export format and options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label>Export Format</Label>
            <RadioGroup
              value={exportOptions.format}
              onValueChange={(value) =>
                setExportOptions({ ...exportOptions, format: value as 'pdf' | 'docx' })
              }
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="pdf"
                className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="pdf" id="pdf" />
                <div className="flex-1">
                  <div className="font-medium">PDF</div>
                  <div className="text-xs text-muted-foreground">Best for printing</div>
                </div>
                <FileText className="h-5 w-5 text-destructive" />
              </Label>
              <Label
                htmlFor="docx"
                className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="docx" id="docx" />
                <div className="flex-1">
                  <div className="font-medium">Word</div>
                  <div className="text-xs text-muted-foreground">Editable document</div>
                </div>
                <FileText className="h-5 w-5 text-info" />
              </Label>
            </RadioGroup>
          </div>

          {/* Scope Selection */}
          <div className="space-y-3">
            <Label>Export Scope</Label>
            <RadioGroup
              value={exportOptions.scope}
              onValueChange={(value) =>
                setExportOptions({ ...exportOptions, scope: value as 'whole' | 'section' })
              }
              className="space-y-2"
            >
              <Label
                htmlFor="whole"
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="whole" id="whole" />
                <div>
                  <div className="font-medium">Entire Report</div>
                  <div className="text-xs text-muted-foreground">
                    Export all sections
                  </div>
                </div>
              </Label>
              <Label
                htmlFor="section"
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="section" id="section" />
                <div className="flex-1">
                  <div className="font-medium">Specific Section</div>
                  <div className="text-xs text-muted-foreground">
                    Export selected section only
                  </div>
                </div>
              </Label>
            </RadioGroup>

            {exportOptions.scope === 'section' && (
              <Select
                value={exportOptions.sectionSlug}
                onValueChange={(value) =>
                  setExportOptions({ ...exportOptions, sectionSlug: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.slug}>
                      {section.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Label>Options</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-toc" className="font-normal cursor-pointer">
                  Include Table of Contents
                </Label>
                <Switch
                  id="include-toc"
                  checked={exportOptions.includeTableOfContents}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeTableOfContents: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-appendices" className="font-normal cursor-pointer">
                  Include Appendices
                </Label>
                <Switch
                  id="include-appendices"
                  checked={exportOptions.includeAppendices}
                  onCheckedChange={(checked) =>
                    setExportOptions({ ...exportOptions, includeAppendices: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setExportModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Download className="h-4 w-4 mr-2" />
            Export {exportOptions.format.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
