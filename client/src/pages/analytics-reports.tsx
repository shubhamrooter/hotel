import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Download, PieChart, TrendingUp, Users, BedDouble, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 150000, occupancy: 75 },
  { month: "Feb", revenue: 180000, occupancy: 82 },
  { month: "Mar", revenue: 165000, occupancy: 78 },
  { month: "Apr", revenue: 190000, occupancy: 85 },
  { month: "May", revenue: 210000, occupancy: 90 },
  { month: "Jun", revenue: 200000, occupancy: 88 },
];

const roomTypeData = [
  { name: "Standard", value: 45, color: "#22c55e" },
  { name: "Deluxe", value: 30, color: "#3b82f6" },
  { name: "Suite", value: 25, color: "#6366f1" },
];

const guestActivityData = [
  { day: "Mon", checkIns: 12, checkOuts: 10 },
  { day: "Tue", checkIns: 15, checkOuts: 13 },
  { day: "Wed", checkIns: 8, checkOuts: 9 },
  { day: "Thu", checkIns: 20, checkOuts: 18 },
  { day: "Fri", checkIns: 25, checkOuts: 22 },
  { day: "Sat", checkIns: 30, checkOuts: 28 },
  { day: "Sun", checkIns: 22, checkOuts: 25 },
];

export default function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">View and analyze business metrics</p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,095,000</div>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="h-5 w-5" />
              Average Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-sm text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Guests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    name="Revenue (₹)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#22c55e"
                    name="Occupancy (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={roomTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Guest Check-ins & Check-outs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={guestActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="checkIns" name="Check-ins" fill="#3b82f6" />
                  <Bar dataKey="checkOuts" name="Check-outs" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}