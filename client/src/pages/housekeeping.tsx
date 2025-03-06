import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BedDouble, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Mock data for housekeeping tasks
const housekeepingTasks = [
  {
    id: 1,
    roomNumber: "101",
    status: "Pending",
    priority: "High",
    type: "Cleaning",
    assignedTo: "Sarah Wilson",
    scheduledTime: "10:00 AM",
  },
  {
    id: 2,
    roomNumber: "205",
    status: "In Progress",
    priority: "Medium",
    type: "Turndown",
    assignedTo: "John Smith",
    scheduledTime: "11:30 AM",
  },
  {
    id: 3,
    roomNumber: "304",
    status: "Completed",
    priority: "Normal",
    type: "Deep Clean",
    assignedTo: "Mike Johnson",
    scheduledTime: "09:00 AM",
  },
];

// Mock data for room status
const roomStatus = {
  clean: 25,
  dirty: 8,
  outOfOrder: 2,
  inProgress: 5,
};

export default function Housekeeping() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Housekeeping</h1>
          <p className="text-muted-foreground">Manage room cleaning and maintenance</p>
        </div>
        <Button>
          <CheckCircle className="h-4 w-4 mr-2" />
          Assign Tasks
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Clean Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{roomStatus.clean}</span>
              <span className="p-2 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="h-5 w-5" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Needs Cleaning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{roomStatus.dirty}</span>
              <span className="p-2 bg-yellow-100 text-yellow-800 rounded-full">
                <AlertCircle className="h-5 w-5" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{roomStatus.inProgress}</span>
              <span className="p-2 bg-blue-100 text-blue-800 rounded-full">
                <Clock className="h-5 w-5" />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Out of Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{roomStatus.outOfOrder}</span>
              <span className="p-2 bg-red-100 text-red-800 rounded-full">
                <BedDouble className="h-5 w-5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {housekeepingTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.roomNumber}</TableCell>
                  <TableCell>{task.type}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{task.scheduledTime}</TableCell>
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
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
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
