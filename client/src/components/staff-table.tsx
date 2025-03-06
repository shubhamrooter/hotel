import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Staff, insertStaffSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";

// Extend the staff schema with more specific validation
const staffFormSchema = insertStaffSchema.extend({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  contact: z.string().min(1, "Contact information is required"),
});

type StaffFormData = z.infer<typeof staffFormSchema>;

export default function StaffTable() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      role: "",
      contact: "",
      isActive: true,
    },
  });

  const { data: staff, isLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const createStaffMutation = useMutation({
    mutationFn: async (data: StaffFormData) => {
      const res = await apiRequest("POST", "/api/staff", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      setIsAddOpen(false);
      form.reset();
      toast({
        title: "Staff member added",
        description: "New staff member has been successfully added.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add staff member",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const res = await apiRequest("PATCH", `/api/staff/${id}/status`, {
        isActive,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Staff status updated",
        description: "Staff member status has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update staff status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) =>
                  createStaffMutation.mutate(data)
                )}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter staff name" />
                      </FormControl>
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
                      <FormControl>
                        <Input {...field} placeholder="Enter staff role" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter contact information" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createStaffMutation.isPending}
                >
                  {createStaffMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Add Staff Member
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.contact}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`flex w-fit items-center gap-1 ${
                      member.isActive
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {member.isActive ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateStatusMutation.mutate({
                        id: member.id,
                        isActive: !member.isActive,
                      })
                    }
                    disabled={updateStatusMutation.isPending}
                  >
                    {member.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}