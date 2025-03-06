import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserPlus, Loader2, FileEdit, History } from "lucide-react";

// Form schema
const staffFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  joiningDate: z.string(),
});

type StaffFormData = z.infer<typeof staffFormSchema>;

// Mock data for staff
const mockStaff = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "9876543210",
    role: "Receptionist",
    department: "Front Desk",
    joiningDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "9876543211",
    role: "Housekeeper",
    department: "Housekeeping",
    joiningDate: "2024-02-01",
    status: "Active",
  },
];

const departments = [
  "Front Desk",
  "Housekeeping",
  "Security",
  "Food & Beverage",
  "Maintenance",
];

const roles = [
  "Receptionist",
  "Housekeeper",
  "Security Guard",
  "Chef",
  "Maintenance Staff",
];

export default function StaffManagement() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      joiningDate: new Date().toISOString().split("T")[0],
    },
  });

  const createStaffMutation = useMutation({
    mutationFn: async (data: StaffFormData) => {
      // TODO: Implement API call
      console.log("Creating staff:", data);
    },
    onSuccess: () => {
      setIsAddOpen(false);
      form.reset();
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage hotel staff and their roles</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createStaffMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="joiningDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={createStaffMutation.isPending}>
                  {createStaffMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Add Staff Member
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStaff.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone}</TableCell>
                    <TableCell>{staff.department}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.joiningDate}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {staff.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
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
}
