import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BedDouble, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock data for room types
const mockRoomTypes = [
  {
    id: 1,
    name: "Standard Room",
    description: "Comfortable room with basic amenities",
    basePrice: 2500,
    occupancy: 2,
    amenities: ["WiFi", "TV", "AC", "Private Bathroom"],
    totalRooms: 20,
    availableRooms: 15,
  },
  {
    id: 2,
    name: "Deluxe Room",
    description: "Spacious room with premium amenities",
    basePrice: 3500,
    occupancy: 2,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "City View"],
    totalRooms: 15,
    availableRooms: 10,
  },
  {
    id: 3,
    name: "Suite",
    description: "Luxury suite with separate living area",
    basePrice: 5000,
    occupancy: 4,
    amenities: ["WiFi", "TV", "AC", "Mini Bar", "Living Room", "Ocean View"],
    totalRooms: 10,
    availableRooms: 8,
  },
];

export default function RoomTypes() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Room Types</h1>
          <p className="text-muted-foreground">Manage hotel room categories</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Room Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room Type</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Room Type Name</label>
                <Input placeholder="e.g., Deluxe Room" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the room type..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Base Price (₹)</label>
                  <Input type="number" placeholder="2500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Occupancy</label>
                  <Input type="number" placeholder="2" />
                </div>
              </div>
              <Button type="submit" className="w-full">Save Room Type</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoomTypes.map((roomType) => (
          <Card key={roomType.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5" />
                  {roomType.name}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{roomType.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Base Price</p>
                    <p className="text-muted-foreground">₹{roomType.basePrice}</p>
                  </div>
                  <div>
                    <p className="font-medium">Max Occupancy</p>
                    <p className="text-muted-foreground">{roomType.occupancy} persons</p>
                  </div>
                  <div>
                    <p className="font-medium">Total Rooms</p>
                    <p className="text-muted-foreground">{roomType.totalRooms}</p>
                  </div>
                  <div>
                    <p className="font-medium">Available</p>
                    <p className="text-muted-foreground">{roomType.availableRooms}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {roomType.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
