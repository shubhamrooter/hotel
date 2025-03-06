import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Guest, Room } from "@shared/schema";
import { 
  BedDouble, 
  Users, 
  Clock, 
  CreditCard,
  Shirt,
  Bell,
  UserPlus,
  LogOut,
  Shield,
  AlertTriangle
} from "lucide-react";

export default function ReceptionDashboard() {
  const { user } = useAuth();

  // Fetch current guests
  const { data: guests, isLoading: isLoadingGuests } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  // Fetch rooms for reference
  const { data: rooms } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const currentGuests = guests?.filter(guest => !guest.checkOut) || [];
  const checkedOutToday = guests?.filter(guest => {
    const checkOut = new Date(guest.checkOut || "");
    const today = new Date();
    return checkOut.toDateString() === today.toDateString();
  }) || [];

  // Get recent activities from actual guest data
  const recentActivities = guests?.slice(0, 5).map(guest => ({
    id: guest.id,
    guest: guest.name,
    action: guest.checkOut ? "Check-out" : "Check-in",
    room: rooms?.find(r => r.id === guest.roomId)?.number || 'N/A',
    time: new Date(guest.checkOut || guest.checkIn).toLocaleTimeString(),
    status: guest.checkOut ? "Completed" : "Active"
  })) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening today.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-blue-500" />
              Current Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{currentGuests.length}</span>
              <span className="text-muted-foreground">guests</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {checkedOutToday.length} check-outs today
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Today's Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">8</span>
              <span className="text-muted-foreground">guests</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">2 VIP arrivals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">4</span>
              <span className="text-muted-foreground">tasks</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">2 high priority</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-500" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">2</span>
              <span className="text-muted-foreground">new</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">1 requires attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <UserPlus className="h-6 w-6 text-blue-500" />
          <span>New Check-in</span>
        </Button>

        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <LogOut className="h-6 w-6 text-green-500" />
          <span>Process Check-out</span>
        </Button>

        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <CreditCard className="h-6 w-6 text-purple-500" />
          <span>Billing</span>
        </Button>

        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <Shirt className="h-6 w-6 text-yellow-500" />
          <span>Laundry</span>
        </Button>

        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <Shield className="h-6 w-6 text-red-500" />
          <span>Security Log</span>
        </Button>

        <Button className="h-24 flex flex-col items-center justify-center gap-2" variant="outline">
          <Clock className="h-6 w-6 text-gray-500" />
          <span>Guest History</span>
        </Button>
      </div>

      {/* Current Guests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Guests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingGuests ? (
            <div className="text-center py-4">Loading guests...</div>
          ) : currentGuests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Check-in Date</TableHead>
                  <TableHead>Expected Check-out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentGuests.map((guest) => {
                  const room = rooms?.find(r => r.id === guest.roomId);
                  return (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>
                        {room ? `${room.number} - ${room.type}` : 'N/A'}
                      </TableCell>
                      <TableCell>{guest.contact}</TableCell>
                      <TableCell>
                        {new Date(guest.checkIn).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {guest.checkOut ? 
                          new Date(guest.checkOut).toLocaleDateString() : 
                          'Not set'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No current guests
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.guest}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.room}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        activity.status === "Completed" ? "bg-green-100 text-green-800" :
                        activity.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }>
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-red-50 rounded-lg border border-red-100">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-800">VIP Guest Arrival</p>
                  <p className="text-sm text-red-600">Mr. Johnson arriving at 2 PM - Suite 501</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-yellow-800">Room Maintenance</p>
                  <p className="text-sm text-yellow-600">Room 302 AC maintenance at 3 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}