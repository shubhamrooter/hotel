import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Hotel, insertHotelSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Loader2, Plus, Key, UserPlus, Edit2, Lock } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";

const hotelFormSchema = insertHotelSchema.extend({
  name: z.string().min(1, "Hotel name is required"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  adminEmail: z.string().email("Invalid email address").optional(),
  adminName: z.string().min(1, "Admin name is required").optional(),
});

type HotelFormData = z.infer<typeof hotelFormSchema>;

export default function HotelManagement() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const { toast } = useToast();

  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      name: "",
      address: "",
      contactNumber: "",
      adminEmail: "",
      adminName: "",
    },
  });

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  const createHotelMutation = useMutation({
    mutationFn: async (data: HotelFormData) => {
      const res = await apiRequest("POST", "/api/hotels", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create hotel");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hotels"] });
      setIsAddOpen(false);
      form.reset();
      toast({
        title: "Hotel added",
        description: "New hotel has been successfully added to the system.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add hotel",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const generateApiKeyMutation = useMutation({
    mutationFn: async (hotelId: number) => {
      const res = await apiRequest("POST", `/api/hotels/${hotelId}/api-key`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to generate API key");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hotels"] });
      toast({
        title: "API Key generated",
        description: "New API key has been generated for the hotel.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to generate API key",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: HotelFormData) => {
    createHotelMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter hotel name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter hotel address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
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
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium mb-4">Hotel Admin Details</h3>
                  <FormField
                    control={form.control}
                    name="adminName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter admin name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adminEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter admin email" type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createHotelMutation.isPending}
                >
                  {createHotelMutation.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Add Hotel
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
              <TableHead>Hotel Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels?.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell className="font-medium">{hotel.name}</TableCell>
                <TableCell>{hotel.address}</TableCell>
                <TableCell>{hotel.contactNumber}</TableCell>
                <TableCell>{hotel.adminEmail || "Not assigned"}</TableCell>
                <TableCell>
                  {format(new Date(hotel.createdAt), "PP")}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateApiKeyMutation.mutate(hotel.id)}
                    disabled={generateApiKeyMutation.isPending}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedHotel(hotel)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Access
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