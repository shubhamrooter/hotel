import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Hotel } from "@shared/schema";
import {
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Users,
  CreditCard,
  Clock,
  BedDouble,
  Hotel as HotelIcon,
  Star
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart2,
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


// Mock data for visualizations
const revenueData = [
  { date: '01/03', amount: 4805, visits: 58000, bounce: 24.6 },
  { date: '02/03', amount: 4920, visits: 59500, bounce: 23.8 },
  { date: '03/03', amount: 5100, visits: 61000, bounce: 25.1 },
  { date: '04/03', amount: 4890, visits: 57800, bounce: 24.2 },
  { date: '05/03', amount: 5200, visits: 62000, bounce: 23.9 },
];

const last30DaysData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  pageViews: Math.floor(Math.random() * 2000) + 1000,
}));

const performanceMetrics = [
  { name: 'New Visits', value: 78 },
  { name: 'Bounce Rate', value: 65 },
  { name: 'Server Load', value: 75 },
  { name: 'Used RAM', value: 55 },
  { name: 'Web Traffic', value: 68 },
  { name: 'Page Views', value: 85 },
];

const visitorStats = [
  { country: 'United States', visits: 8795, clicks: 145 },
  { country: 'Japan', visits: 9856, clicks: 356 },
  { country: 'Australia', visits: 5748, clicks: 524 },
  { country: 'India', visits: 8547, clicks: 127 },
];

interface CircularProgressProps {
  value: number;
  label: string;
  color?: string;
}

function CircularProgress({ value, label, color = "primary" }: CircularProgressProps) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-muted"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={`stroke-${color}`}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

const renderSuperAdminDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/90">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-white">$4,805</span>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <ArrowUpRight className="h-3 w-3" />
                8.2% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/90">Total Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-white">58K</span>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <ArrowDownRight className="h-3 w-3" />
                -2.5% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-green-500 to-green-600 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/90">Store Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-white">8.6K</span>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <ArrowUpRight className="h-3 w-3" />
                +4.3% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white/90">Bounce Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-white">24.6%</span>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <ArrowDownRight className="h-3 w-3" />
                +1.2% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white dark:bg-gray-800 min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ background: 'rgb(18,24,26)', border: 'none', borderRadius: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="rgb(59, 130, 246)"
                  fill="url(#colorRevenue)"
                  name="Revenue ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceMetrics.map((metric) => (
              <CircularProgress
                key={metric.name}
                value={metric.value}
                label={metric.name}
                color={
                  metric.value > 75 ? "green-500" :
                  metric.value > 50 ? "blue-500" :
                  "orange-500"
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Last 30 Days</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last30DaysData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#22c55e"
                  fill="url(#colorViews)"
                  name="Page Views"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Realtime Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[200px] bg-muted/10 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">World Map Visualization</span>
            </div>
            <div className="space-y-2">
              {visitorStats.map((stat) => (
                <div key={stat.country} className="flex items-center justify-between">
                  <span>{stat.country}</span>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline">{stat.visits} visits</span>
                    <span className="sm:hidden">{stat.visits}</span>
                    <span className="hidden sm:inline">{stat.clicks} clicks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const renderReceptionistDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <BedDouble className="h-4 w-4 text-muted-foreground" />
          <span className="text-2xl font-bold">5</span>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-2xl font-bold">3</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

const renderHotelAdminDashboard = () => {
  // Mock data for hotel admin dashboard
  const todayBookings = [
    { id: 1, guestName: "John Smith", roomNo: "101", checkIn: "2024-03-05", nights: 3 },
    { id: 2, guestName: "Sarah Wilson", roomNo: "204", checkIn: "2024-03-05", nights: 2 },
    { id: 3, guestName: "Mike Johnson", roomNo: "305", checkIn: "2024-03-06", nights: 1 },
  ];

  const revenueByRoom = [
    { category: "Standard", revenue: 45000, occupancy: 85 },
    { category: "Deluxe", revenue: 65000, occupancy: 75 },
    { category: "Suite", revenue: 85000, occupancy: 60 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">78%</span>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <ArrowUpRight className="h-4 w-4" />
                  5% from last week
                </div>
              </div>
              <BedDouble className="h-8 w-8 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">₹58,500</span>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <ArrowUpRight className="h-4 w-4" />
                  12% from yesterday
                </div>
              </div>
              <CreditCard className="h-8 w-8 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">24</span>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <Clock className="h-4 w-4" />
                  8 check-ins today
                </div>
              </div>
              <Users className="h-8 w-8 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Guest Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">4.8</span>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <Star className="h-4 w-4" />
                  Based on 156 reviews
                </div>
              </div>
              <Star className="h-8 w-8 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Room Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Room Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByRoom.map((room) => (
                <div key={room.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{room.category}</span>
                    <span className="text-muted-foreground">₹{room.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${room.occupancy}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-medium">{room.occupancy}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Room No</TableHead>
                  <TableHead>Check-in Date</TableHead>
                  <TableHead>Nights</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.guestName}</TableCell>
                    <TableCell>{booking.roomNo}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.nights}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Confirmed
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getDashboardContent = () => {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case "super_admin":
      return renderSuperAdminDashboard();
    case "hotel_admin":
      return renderHotelAdminDashboard();
    case "receptionist":
      return renderReceptionistDashboard();
    default:
      return null;
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  const { data: hotels, isLoading: isHotelsLoading } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
    enabled: user?.role === 'super_admin',
  });

  if (isHotelsLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.username}!</h1>
        <p className="text-muted-foreground">Here's what's happening today.</p>
      </div>
      {getDashboardContent()}
    </div>
  );
}