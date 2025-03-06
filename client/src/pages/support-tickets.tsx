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
import { MessageSquare, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for tickets
const mockTickets = [
  {
    id: "T-1001",
    subject: "Login Issues",
    priority: "High",
    status: "Open",
    hotel: "Grand Plaza",
    assignedTo: "John Smith",
    created: "2024-03-05T10:30:00",
  },
  {
    id: "T-1002",
    subject: "Payment Gateway Error",
    priority: "Critical",
    status: "In Progress",
    hotel: "Sunset Resort",
    assignedTo: "Sarah Wilson",
    created: "2024-03-05T09:15:00",
  },
  {
    id: "T-1003",
    subject: "Room Booking System Down",
    priority: "Critical",
    status: "Open",
    hotel: "Mountain View Hotel",
    assignedTo: "Unassigned",
    created: "2024-03-05T08:45:00",
  },
];

export default function SupportTickets() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <p className="text-muted-foreground">Manage and respond to support requests</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-8" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.priority === "Critical"
                          ? "bg-red-100 text-red-800"
                          : "bg-orange-100 text-orange-800"
                      }`}>
                        {ticket.priority}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === "Open"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {ticket.status}
                      </span>
                    </TableCell>
                    <TableCell>{ticket.hotel}</TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>{new Date(ticket.created).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">12</span>
              <span className="text-sm text-muted-foreground">Need attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">2.5h</span>
              <span className="text-sm text-muted-foreground">Last 7 days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">94%</span>
              <span className="text-sm text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
