import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Clock, MoreVertical, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockReports, mockTemplates } from '@/data/mockData';
import TopBar from '@/components/dashboard/TopBar';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'review': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-muted-foreground">
            Manage your reports and create new documents
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={() => navigate('/reports/new')} className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search reports..." className="pl-10" />
          </div>
        </div>

        {/* Recent Reports */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockReports.map((report) => (
              <Card 
                key={report.id} 
                className="hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(`/reports/${report.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base line-clamp-1">{report.title}</CardTitle>
                        <CardDescription className="text-xs">v{report.version}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {report.description || 'No description'}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Updated {new Date(report.updatedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Templates</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {mockTemplates.slice(0, 4).map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-sm">{template.name}</CardTitle>
                  <CardDescription className="text-xs">{template.category}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
