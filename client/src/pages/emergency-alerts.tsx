import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell, Shield, Phone } from "lucide-react";

// Mock data for emergency alerts
const emergencyAlerts = [
  {
    id: 1,
    type: "Security",
    location: "Floor 3, Room 301",
    reportedBy: "John Smith",
    timestamp: "2024-03-05 10:30 AM",
    status: "Active",
    description: "Suspicious activity reported",
    actionTaken: "Security team dispatched",
  },
  {
    id: 2,
    type: "Medical",
    location: "Restaurant Area",
    reportedBy: "Sarah Wilson",
    timestamp: "2024-03-05 11:00 AM",
    status: "Resolved",
    description: "Guest feeling unwell",
    actionTaken: "Medical assistance provided",
  },
];

export default function EmergencyAlerts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Emergency Alerts</h1>
          <p className="text-muted-foreground">Monitor and respond to emergency situations</p>
        </div>
        <Button variant="destructive">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Raise Emergency Alert
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Police:</span>
                <span className="font-bold">100</span>
              </div>
              <div className="flex justify-between">
                <span>Fire:</span>
                <span className="font-bold">101</span>
              </div>
              <div className="flex justify-between">
                <span>Ambulance:</span>
                <span className="font-bold">102</span>
              </div>
              <div className="flex justify-between">
                <span>Security:</span>
                <span className="font-bold">1234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Normal</div>
            <p className="text-sm text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Today's Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Total alerts today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Alert Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action Taken</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <Badge variant="outline" className={
                      alert.type === "Security" ? "bg-red-100 text-red-800" :
                      alert.type === "Medical" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }>
                      {alert.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell>{alert.reportedBy}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      alert.status === "Active" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }>
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>{alert.actionTaken}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Update Status</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
