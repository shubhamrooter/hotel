import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Staff, StaffAttendance } from "@shared/schema";
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
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, CheckCircle, XCircle, Clock, Calendar, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StaffAttendanceTable() {
  const { toast } = useToast();
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);

  const { data: staff, isLoading: isStaffLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const { data: attendance, isLoading: isAttendanceLoading } = useQuery<StaffAttendance[]>({
    queryKey: ["/api/staff/attendance"],
  });

  const markAttendanceMutation = useMutation({
    mutationFn: async ({ staffId, status }: { staffId: number; status: string }) => {
      const res = await apiRequest("POST", "/api/staff/attendance", {
        staffId,
        status,
        checkIn: new Date().toISOString(),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff/attendance"] });
      toast({
        title: "Attendance marked",
        description: "Staff attendance has been successfully recorded.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to mark attendance",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const requestLeaveMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/staff/leave-requests", data);
      return res.json();
    },
    onSuccess: () => {
      setShowLeaveRequest(false);
      toast({
        title: "Leave request submitted",
        description: "Your leave request has been submitted for approval.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit leave request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Present
          </Badge>
        );
      case "absent":
        return (
          <Badge variant="secondary" className="bg-red-500/10 text-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      case "late":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Late
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isStaffLoading || isAttendanceLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Staff Attendance</h2>
        <Dialog open={showLeaveRequest} onOpenChange={setShowLeaveRequest}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              requestLeaveMutation.mutate({
                staffId: selectedStaff,
                startDate: formData.get("startDate"),
                endDate: formData.get("endDate"),
                type: formData.get("type"),
                reason: formData.get("reason"),
              });
            }}>
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" name="startDate" required />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" name="endDate" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <Textarea name="reason" placeholder="Please provide a reason for your leave request" required />
              </div>
              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Today's Status</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead>Current Shift</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff?.map((member) => {
              const todayAttendance = attendance?.find(
                (a) =>
                  a.staffId === member.id &&
                  format(new Date(a.checkIn), "yyyy-MM-dd") ===
                    format(new Date(), "yyyy-MM-dd")
              );

              return (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    {todayAttendance ? (
                      getStatusBadge(todayAttendance.status)
                    ) : (
                      <Badge variant="secondary" className="bg-gray-500/10 text-gray-500">
                        Not Marked
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {todayAttendance
                      ? format(new Date(todayAttendance.checkIn), "hh:mm a")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {member.shift || "Day Shift (9 AM - 5 PM)"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!todayAttendance && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            markAttendanceMutation.mutate({
                              staffId: member.id,
                              status: "present",
                            })
                          }
                          disabled={markAttendanceMutation.isPending}
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            markAttendanceMutation.mutate({
                              staffId: member.id,
                              status: "absent",
                            })
                          }
                          disabled={markAttendanceMutation.isPending}
                        >
                          Absent
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            markAttendanceMutation.mutate({
                              staffId: member.id,
                              status: "late",
                            })
                          }
                          disabled={markAttendanceMutation.isPending}
                        >
                          Late
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StaffAttendanceTable;