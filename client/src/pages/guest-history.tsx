import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { History, Search, Star, User } from "lucide-react";

// Mock data for guest history
const guestHistory = [
  {
    id: 1,
    name: "John Smith",
    phone: "+91 98765 43210",
    lastStay: "2024-02-28",
    totalStays: 5,
    preferredRoom: "Deluxe",
    status: "Regular",
    specialRequests: "Extra pillows, Late checkout",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    phone: "+91 98765 43211",
    lastStay: "2024-03-01",
    totalStays: 3,
    preferredRoom: "Suite",
    status: "VIP",
    specialRequests: "Vegetarian meals",
  },
];

export default function GuestHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Guest History</h1>
          <p className="text-muted-foreground">View and manage guest records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Total Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-sm text-muted-foreground">Registered guests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              VIP Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Premium customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Return Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-sm text-muted-foreground">Returning guests</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search guests..." className="pl-8" />
            </div>
            <Button variant="outline">Export Records</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Stay</TableHead>
                <TableHead>Total Stays</TableHead>
                <TableHead>Preferred Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Special Requests</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guestHistory.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>{guest.lastStay}</TableCell>
                  <TableCell>{guest.totalStays}</TableCell>
                  <TableCell>{guest.preferredRoom}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      guest.status === "VIP" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }>
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{guest.specialRequests}</TableCell>
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
