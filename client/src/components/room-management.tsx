import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Room, insertRoomSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Loader2, Plus, Clock, ArrowUpDown } from "lucide-react";
import RoomGrid from "./room-grid";

// Enhanced schema to include more room details
const roomFormSchema = z.object({
  number: z.string().min(1, "Room number is required"),
  type: z.string().min(1, "Room type is required"),
  rate: z.coerce.number().min(1, "Room rate must be greater than 0"),
  status: z.string().default("available"),
  maxOccupancy: z.coerce.number().min(1, "Maximum occupancy required"),
  allowsEarlyCheckIn: z.boolean().default(false),
  allowsLateCheckout: z.boolean().default(false),
  maintenanceNotes: z.string().optional(),
});

type RoomFormData = z.infer<typeof roomFormSchema>;

// Mock data for room change requests
const roomChangeRequests = [
  {
    id: 1,
    guestName: "John Smith",
    currentRoom: "101",
    requestedRoom: "301",
    reason: "Upgrade to suite",
    status: "Pending",
  },
  {
    id: 2,
    guestName: "Sarah Wilson",
    currentRoom: "205",
    requestedRoom: "208",
    reason: "Noise complaint",
    status: "Approved",
  },
];

export default function RoomManagement() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rooms");
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      number: "",
      type: "standard",
      rate: 1000,
      status: "available",
      maxOccupancy: 2,
      allowsEarlyCheckIn: false,
      allowsLateCheckout: false,
    },
  });

  const createRoomMutation = useMutation({
    mutationFn: async (data: RoomFormData) => {
      const roomData = {
        ...data,
        hotelId: user?.hotelId || 1,
      };
      const res = await apiRequest("POST", "/api/rooms", roomData);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add room");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      setIsAddOpen(false);
      form.reset();
      toast({
        title: "Room added",
        description: "New room has been successfully added.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add room",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RoomFormData) => {
    createRoomMutation.mutate(data);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="requests">Change Requests</TabsTrigger>
          <TabsTrigger value="schedule">Check-in/out Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          {(user?.role === "super_admin" || user?.role === "hotel_admin") && (
            <div className="flex justify-end mb-4">
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Room
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter room number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select room type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="deluxe">Deluxe</SelectItem>
                                <SelectItem value="suite">Suite</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room Rate (₹/night)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="maxOccupancy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Occupancy</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name="allowsEarlyCheckIn"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="m-0">Early Check-in Available</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="allowsLateCheckout"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="m-0">Late Checkout Available</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={createRoomMutation.isPending}
                      >
                        {createRoomMutation.isPending && (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        )}
                        Add Room
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <RoomGrid />
        </TabsContent>

        <TabsContent value="requests">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Guest Name</th>
                  <th className="p-4 text-left">Current Room</th>
                  <th className="p-4 text-left">Requested Room</th>
                  <th className="p-4 text-left">Reason</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomChangeRequests.map((request) => (
                  <tr key={request.id} className="border-b">
                    <td className="p-4">{request.guestName}</td>
                    <td className="p-4">{request.currentRoom}</td>
                    <td className="p-4">{request.requestedRoom}</td>
                    <td className="p-4">{request.reason}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          request.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Process Request
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md border">
                <h3 className="font-medium mb-2">Early Check-ins Today</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="font-medium">Room 301</p>
                      <p className="text-sm text-muted-foreground">John Smith</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>9:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-md border">
                <h3 className="font-medium mb-2">Late Check-outs Today</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="font-medium">Room 205</p>
                      <p className="text-sm text-muted-foreground">Sarah Wilson</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}