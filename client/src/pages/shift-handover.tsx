import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Clock, UserCheck, AlertCircle, CheckCircle } from "lucide-react";

// Mock data for shift handovers
const handoverNotes = [
  {
    id: 1,
    outgoingStaff: "John Smith",
    incomingStaff: "Sarah Wilson",
    shift: "Morning to Afternoon",
    timestamp: "2024-03-05 14:00",
    status: "Completed",
    pendingTasks: "Room 301 check-out pending",
    importantNotes: "VIP guest arriving at 4 PM",
  },
  {
    id: 2,
    outgoingStaff: "Sarah Wilson",
    incomingStaff: "Mike Johnson",
    shift: "Afternoon to Night",
    timestamp: "2024-03-05 22:00",
    status: "Pending",
    pendingTasks: "2 room service requests",
    importantNotes: "Maintenance work on 4th floor",
  },
];

export default function ShiftHandover() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shift Handover</h1>
          <p className="text-muted-foreground">Manage shift transitions and important notes</p>
        </div>
        <Button>
          <Clock className="h-4 w-4 mr-2" />
          Start Handover
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Current Shift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Afternoon</div>
            <p className="text-sm text-muted-foreground">2:00 PM - 10:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">To be completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Last Handover
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:00 PM</div>
            <p className="text-sm text-muted-foreground">Completed successfully</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Handover Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pending Tasks</label>
              <Textarea
                placeholder="List any pending tasks or ongoing issues..."
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Important Notes</label>
              <Textarea
                placeholder="Add any important information for the next shift..."
                className="mt-1"
              />
            </div>
            <Button className="w-full">Submit Handover</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Handovers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Outgoing Staff</TableHead>
                <TableHead>Incoming Staff</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pending Tasks</TableHead>
                <TableHead>Important Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {handoverNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>{note.outgoingStaff}</TableCell>
                  <TableCell>{note.incomingStaff}</TableCell>
                  <TableCell>{note.shift}</TableCell>
                  <TableCell>{note.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      note.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }>
                      {note.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{note.pendingTasks}</TableCell>
                  <TableCell>{note.importantNotes}</TableCell>
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
