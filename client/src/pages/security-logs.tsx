import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Search, AlertTriangle, CheckCircle, FileText } from "lucide-react";

// Mock data for security logs
const securityLogs = [
  {
    id: 1,
    guestName: "John Smith",
    action: "Check-in",
    timestamp: "2024-03-05 10:30 AM",
    verificationId: "AAXXXX1234X",
    verifiedBy: "Receptionist A",
    status: "Verified",
    notes: "ID verification complete",
  },
  {
    id: 2,
    guestName: "Sarah Wilson",
    action: "Check-out",
    timestamp: "2024-03-05 11:00 AM",
    verificationId: "AAXXXX5678X",
    verifiedBy: "Receptionist B",
    status: "Completed",
    notes: "Room inspection done",
  },
];

export default function SecurityLogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Security Logs</h1>
          <p className="text-muted-foreground">Track and monitor guest verification records</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Today's Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">ID verifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Successful Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-sm text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verification Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Verification ID</TableHead>
                <TableHead>Verified By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.guestName}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.verificationId}</TableCell>
                  <TableCell>{log.verifiedBy}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      log.status === "Verified" ? "bg-green-100 text-green-800" :
                      log.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.notes}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
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
