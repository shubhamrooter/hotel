import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  MoreVertical,
  PlusCircle,
  Edit,
  Trash,
  FilterX,
} from "lucide-react";
import { format } from "date-fns";

const mockStaffData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Hotel Manager",
    hotel: "Grand Plaza Hotel",
    joinDate: "2024-01-15",
    status: "Active",
    salary: 45000,
  },
  // Add more mock data as needed
];

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHotel, setFilterHotel] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <p className="text-muted-foreground">Manage staff across all hotels</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff List
          </CardTitle>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Staff
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterHotel} onValueChange={setFilterHotel}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by Hotel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="grand-plaza">Grand Plaza Hotel</SelectItem>
                  <SelectItem value="sunset-resort">Sunset Resort</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStaffData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {staff.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.hotel}</TableCell>
                      <TableCell>
                        {format(new Date(staff.joinDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          staff.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {staff.status}
                        </span>
                      </TableCell>
                      <TableCell>₹{staff.salary.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              View Attendance
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
