import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  MessageSquare,
  Server,
  Settings,
  Users,
  XCircle,
} from "lucide-react";

// Mock data for support tickets
const mockTickets = [
  {
    id: "T-1001",
    subject: "Login Issues",
    priority: "High",
    status: "Open",
    hotel: "Grand Plaza",
    created: "2024-03-05T10:30:00",
  },
  {
    id: "T-1002",
    subject: "Payment Gateway Error",
    priority: "Critical",
    status: "In Progress",
    hotel: "Sunset Resort",
    created: "2024-03-05T09:15:00",
  },
];

// Mock data for system metrics
const systemMetrics = {
  cpu: 45,
  memory: 62,
  disk: 38,
  network: 28,
};

// Mock data for notifications
const recentNotifications = [
  {
    id: 1,
    type: "alert",
    message: "High server load detected",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    type: "info",
    message: "System backup completed successfully",
    timestamp: "1 hour ago",
  },
];

// Mock data for system logs
const systemLogs = [
  {
    id: 1,
    timestamp: "2024-03-05T11:30:00",
    level: "ERROR",
    message: "Database connection timeout",
    service: "Database",
  },
  {
    id: 2,
    timestamp: "2024-03-05T11:28:00",
    level: "INFO",
    message: "Daily backup completed successfully",
    service: "Backup",
  },
  {
    id: 3,
    timestamp: "2024-03-05T11:25:00",
    level: "WARN",
    message: "High memory usage detected",
    service: "System",
  },
];

// Mock data for backup status
const backupStatus = {
  lastBackup: "2024-03-05T10:00:00",
  nextBackup: "2024-03-05T22:00:00",
  status: "Healthy",
  storageUsed: "125GB",
  totalStorage: "500GB",
  recentBackups: [
    { id: 1, timestamp: "2024-03-05T10:00:00", size: "2.5GB", status: "Success" },
    { id: 2, timestamp: "2024-03-04T22:00:00", size: "2.4GB", status: "Success" },
    { id: 3, timestamp: "2024-03-04T10:00:00", size: "2.5GB", status: "Success" },
  ],
};

export default function SystemMonitoring() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Monitoring</h1>
        <p className="text-muted-foreground">Monitor system health and manage communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">All Systems Operational</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">128</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-500" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-2xl font-bold">45%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm">{systemMetrics.cpu}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${systemMetrics.cpu}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm">{systemMetrics.memory}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${systemMetrics.memory}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Disk Usage</span>
                  <span className="text-sm">{systemMetrics.disk}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${systemMetrics.disk}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Network Load</span>
                  <span className="text-sm">{systemMetrics.network}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${systemMetrics.network}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Backup Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Last Backup</p>
                  <p className="text-sm font-medium">{new Date(backupStatus.lastBackup).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Backup</p>
                  <p className="text-sm font-medium">{new Date(backupStatus.nextBackup).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-sm font-medium">{backupStatus.storageUsed} / {backupStatus.totalStorage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium">{backupStatus.status}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backupStatus.recentBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>{new Date(backup.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {backup.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          log.level === "ERROR"
                            ? "bg-red-100 text-red-800"
                            : log.level === "WARN"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {log.level}
                      </span>
                    </TableCell>
                    <TableCell>{log.service}</TableCell>
                    <TableCell>{log.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 rounded-lg border"
              >
                {notification.type === "alert" ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}