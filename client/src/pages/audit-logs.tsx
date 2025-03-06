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
import { Activity, Filter } from "lucide-react";
import { format } from "date-fns";

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">Track user activity and system changes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter Logs
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{format(new Date(), "PPpp")}</TableCell>
                  <TableCell>admin@stayguard.com</TableCell>
                  <TableCell>User Login</TableCell>
                  <TableCell>Successful login attempt</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                </TableRow>
                {/* More audit logs will be populated here */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}