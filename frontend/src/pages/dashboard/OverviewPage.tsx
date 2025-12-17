import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { mockReports, mockTemplates } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const OverviewPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'review': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const stats = [
    { label: 'Total Reports', value: '24', icon: FileText, change: '+3 this week' },
    { label: 'In Progress', value: '8', icon: Clock, change: '2 due today' },
    { label: 'Completed', value: '16', icon: TrendingUp, change: '+12% this month' },
    { label: 'Team Members', value: '5', icon: Users, change: '1 pending invite' },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your reports today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/reports')}>
            View all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
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
      </div>

      {/* Quick Access Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quick Start Templates</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/templates')}>
            Browse all
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockTemplates.slice(0, 4).map((template) => (
            <Card 
              key={template.id} 
              className="hover:shadow-md hover:border-accent/50 transition-all cursor-pointer"
            >
              <CardHeader>
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <CardTitle className="text-sm">{template.name}</CardTitle>
                <CardDescription className="text-xs">{template.category}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
