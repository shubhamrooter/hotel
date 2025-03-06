import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, AlertCircle, CheckCircle, Clock } from "lucide-react";

// Mock data for maintenance tasks
const maintenanceTasks = [
  {
    id: 1,
    roomNumber: "301",
    issue: "AC not cooling properly",
    priority: "High",
    status: "In Progress",
    assignedTo: "John Tech",
    reportedDate: "2024-03-05",
  },
  {
    id: 2,
    roomNumber: "205",
    issue: "Bathroom faucet leaking",
    priority: "Medium",
    status: "Pending",
    assignedTo: "Mike Fix",
    reportedDate: "2024-03-04",
  },
];

export default function Maintenance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Maintenance Management</h1>
          <p className="text-muted-foreground">Track and manage maintenance requests</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">Tasks resolved</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Reported Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.roomNumber}</TableCell>
                  <TableCell>{task.issue}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.reportedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      task.priority === "High" ? "bg-red-100 text-red-800" :
                      task.priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      task.status === "Completed" ? "bg-green-100 text-green-800" :
                      task.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }>
                      {task.status}
                    </Badge>
                  </TableCell>
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
