import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Room, insertRoomSchema } from "@shared/schema";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus } from "lucide-react";
import { z } from "zod";

const roomTypes = [
  { value: "standard", label: "Standard Room" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "suite", label: "Suite" },
];

export default function RoomManagement() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof insertRoomSchema>>({
    resolver: zodResolver(insertRoomSchema),
    defaultValues: {
      number: "",
      type: "standard",
      rate: 1000,
      status: "available",
      hotelId: 1
    }
  });

  // Fetch rooms
  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  // Create room mutation
  const createRoom = useMutation({
    mutationFn: async (data: z.infer<typeof insertRoomSchema>) => {
      const roomData = {
        ...data,
        rate: Number(data.rate),
        hotelId: 1 // Explicitly set hotelId
      };
      return await apiRequest("POST", "/api/rooms", roomData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      setIsOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Room created successfully"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create room",
        variant: "destructive"
      });
    }
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof insertRoomSchema>) {
    createRoom.mutate(values);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Rate</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={createRoom.isPending}
                  className="w-full"
                >
                  {createRoom.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add Room
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : rooms?.length ? (
          rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Room {room.number}</span>
                  <Badge variant="outline">
                    {room.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Type: {room.type}</p>
                  <p>Rate: ₹{room.rate}/night</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No rooms found. Add your first room to get started.
          </div>
        )}
      </div>
    </div>
  );
}

const roomAmenities = {
  standard: ["Wi-Fi", "TV", "AC", "Daily Housekeeping"],
  deluxe: ["Wi-Fi", "TV", "AC", "Mini Bar", "Room Service", "Daily Housekeeping"],
  suite: [
    "Wi-Fi",
    "TV",
    "AC",
    "Mini Bar",
    "Room Service",
    "Daily Housekeeping",
    "Living Area",
    "Jacuzzi",
  ],
};