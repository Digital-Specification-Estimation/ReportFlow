import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Upload, Plus } from 'lucide-react';
import { mockTemplates } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const TemplatesPage = () => {
  const categories = [...new Set(mockTemplates.map(t => t.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">Start a new report from a template</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import .docx
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search templates..." className="pl-10" />
      </div>

      {/* Templates by Category */}
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-lg font-semibold mb-4">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockTemplates
              .filter(t => t.category === category)
              .map((template) => (
                <Card 
                  key={template.id} 
                  className="hover:shadow-md hover:border-accent/50 transition-all cursor-pointer group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      {template.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
