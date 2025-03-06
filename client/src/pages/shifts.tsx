import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, Calendar, Users } from "lucide-react";

// Mock data for shifts
const mockShifts = [
  {
    id: 1,
    shift: "Morning",
    timing: "6:00 AM - 2:00 PM",
    staffAssigned: 12,
    supervisor: "John Smith",
    status: "Active",
  },
  {
    id: 2,
    shift: "Afternoon",
    timing: "2:00 PM - 10:00 PM",
    staffAssigned: 10,
    supervisor: "Sarah Wilson",
    status: "Active",
  },
  {
    id: 3,
    shift: "Night",
    timing: "10:00 PM - 6:00 AM",
    staffAssigned: 8,
    supervisor: "Mike Johnson",
    status: "Active",
  },
];

export default function Shifts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shift Management</h1>
          <p className="text-muted-foreground">Manage staff shifts and schedules</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Shift
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Shifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Staff on Duty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-sm text-muted-foreground">Across all shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Schedule updates</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Staff Assigned</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-medium">{shift.shift}</TableCell>
                  <TableCell>{shift.timing}</TableCell>
                  <TableCell>{shift.staffAssigned} members</TableCell>
                  <TableCell>{shift.supervisor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {shift.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
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
