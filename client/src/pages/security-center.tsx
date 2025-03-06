import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, Key, FileCheck, AlertCircle, UserCheck, ScrollText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Mock data for activity logs
const activityLogs = [
  {
    id: 1,
    timestamp: "2024-03-05 14:30:00",
    user: "John Admin",
    action: "User Login",
    details: "Successful login from IP 192.168.1.100",
    severity: "info"
  },
  {
    id: 2,
    timestamp: "2024-03-05 14:25:00",
    user: "System",
    action: "Database Backup",
    details: "Automated backup completed successfully",
    severity: "success"
  },
  {
    id: 3,
    timestamp: "2024-03-05 14:20:00",
    user: "Sarah Staff",
    action: "Access Attempt",
    details: "Unauthorized access attempt to admin section",
    severity: "warning"
  }
];

// Mock data for compliance metrics
const complianceMetrics = [
  {
    name: "Data Privacy",
    score: 92,
    lastAudit: "2024-02-28",
    status: "Compliant"
  },
  {
    name: "Security Protocols",
    score: 88,
    lastAudit: "2024-03-01",
    status: "Compliant"
  },
  {
    name: "Staff Training",
    score: 75,
    lastAudit: "2024-02-15",
    status: "Needs Attention"
  }
];

export default function SecurityCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Center</h1>
        <p className="text-muted-foreground">Monitor and manage system security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>All Systems Secure</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">24</span>
            <p className="text-sm text-muted-foreground">Current active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Access Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">156</span>
            <p className="text-sm text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">85%</span>
            <p className="text-sm text-muted-foreground">Overall rating</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted">
                  <div className={`p-2 rounded-full ${
                    log.severity === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    log.severity === 'success' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{log.action}</p>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <p className="text-sm font-medium mt-1">User: {log.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {complianceMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{metric.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        metric.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {metric.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Last audit: {metric.lastAudit}
                    </span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Score: {metric.score}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Security Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24">
              <div className="text-center">
                <UserCheck className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Access Control</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="text-center">
                <ScrollText className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Policy Manager</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Security Scan</span>
              </div>
            </Button>
            <Button variant="outline" className="h-24">
              <div className="text-center">
                <Globe className="h-5 w-5 mx-auto mb-2" />
                <span className="text-sm">Data Privacy</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}