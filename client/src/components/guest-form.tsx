import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { insertGuestSchema, Room, Guest } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, History } from "lucide-react";
import { z } from "zod";

// Extended schema for client-side validation
const guestFormSchema = insertGuestSchema.extend({
  name: z.string().min(1, "Guest name is required"),
  contact: z.string().min(1, "Contact number is required"),
  idNumber: z.string().min(1, "ID number is required"),
  roomId: z.number().min(1, "Please select a room"),
});

export default function GuestForm() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("new-guest");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  // Guest Check-in Form
  const form = useForm({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      idNumber: "",
      roomId: 0,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      hotelId: 1,
    },
  });

  // Fetch available rooms
  const { data: rooms, isLoading: isLoadingRooms } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  // Fetch guest history
  const { data: guestHistory, isLoading: isLoadingHistory } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
    enabled: activeTab === "guest-history",
  });

  // Create guest mutation
  const createGuestMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!data.name || !data.contact || !data.idNumber || !data.roomId) {
        throw new Error("Please fill in all required fields");
      }

      return await apiRequest("POST", "/api/guests", {
        ...data,
        checkIn: new Date(data.checkIn).toISOString(),
        checkOut: new Date(data.checkOut).toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/guests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      form.reset();
      toast({
        title: "Check-in successful",
        description: "Guest has been checked in successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to check in guest",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const availableRooms = rooms?.filter((room) => room.status === "available") || [];

  const onSubmit = (data: z.infer<typeof guestFormSchema>) => {
    if (!data.name.trim() || !data.contact.trim() || !data.idNumber.trim() || !data.roomId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createGuestMutation.mutate(data);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-guest">New Guest</TabsTrigger>
          <TabsTrigger value="guest-history">Guest History</TabsTrigger>
        </TabsList>

        <TabsContent value="new-guest">
          <Card>
            <CardHeader>
              <CardTitle>Guest Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter guest name" />
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
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter contact number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter ID number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="roomId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value))}
                          value={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a room" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableRooms.map((room) => (
                              <SelectItem key={room.id} value={room.id.toString()}>
                                Room {room.number} - {room.type} (₹{room.rate}/night)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={createGuestMutation.isPending || isLoadingRooms || !form.formState.isValid}
                  >
                    {createGuestMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2" />
                    )}
                    Check In Guest
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guest-history">
          <Card>
            <CardHeader>
              <CardTitle>Guest History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : guestHistory && guestHistory.length > 0 ? (
                <div className="space-y-4">
                  {guestHistory.map((guest) => (
                    <Card key={guest.id}>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Guest Name</p>
                            <p className="font-medium">{guest.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Contact</p>
                            <p className="font-medium">{guest.contact}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Check-in</p>
                            <p className="font-medium">
                              {new Date(guest.checkIn).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Check-out</p>
                            <p className="font-medium">
                              {guest.checkOut
                                ? new Date(guest.checkOut).toLocaleDateString()
                                : "Not checked out"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedGuest(guest)}
                          >
                            <History className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No guest history available
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Guest Details Modal */}
      <Dialog open={!!selectedGuest} onOpenChange={() => setSelectedGuest(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Guest Details</DialogTitle>
          </DialogHeader>
          {selectedGuest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-sm font-medium col-span-4">Guest Information</p>
                <div className="col-span-4 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedGuest.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{selectedGuest.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ID Number</p>
                    <p className="font-medium">{selectedGuest.idNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Room Number</p>
                    <p className="font-medium">
                      {rooms?.find(r => r.id === selectedGuest.roomId)?.number || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in Date</p>
                    <p className="font-medium">
                      {new Date(selectedGuest.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-out Date</p>
                    <p className="font-medium">
                      {selectedGuest.checkOut
                        ? new Date(selectedGuest.checkOut).toLocaleDateString()
                        : "Not checked out"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}