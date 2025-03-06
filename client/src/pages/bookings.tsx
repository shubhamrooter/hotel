import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { useState } from "react";

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    guestName: "John Smith",
    roomNumber: "301",
    checkIn: "2024-03-05",
    checkOut: "2024-03-08",
    status: "Confirmed",
    guests: 2,
    specialRequests: "Early check-in requested",
  },
  {
    id: 2,
    guestName: "Sarah Wilson",
    roomNumber: "205",
    checkIn: "2024-03-06",
    checkOut: "2024-03-10",
    status: "Pending",
    guests: 3,
    specialRequests: "Extra bed needed",
  },
];

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage hotel reservations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Today's Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">3 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Check-outs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">2 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Expected Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Total today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.guestName}</p>
                        <p className="text-sm text-muted-foreground">{booking.guests} guests</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.roomNumber}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
