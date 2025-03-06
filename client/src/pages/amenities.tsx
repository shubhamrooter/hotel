import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Check, X } from "lucide-react";

// Mock data for amenities
const amenityCategories = [
  {
    name: "Room Amenities",
    items: [
      { name: "WiFi", status: "Available", icon: "📡" },
      { name: "Mini Bar", status: "Available", icon: "🍷" },
      { name: "Safe", status: "Available", icon: "🔒" },
      { name: "Smart TV", status: "Maintenance", icon: "📺" },
    ],
  },
  {
    name: "Hotel Facilities",
    items: [
      { name: "Swimming Pool", status: "Available", icon: "🏊‍♂️" },
      { name: "Gym", status: "Available", icon: "💪" },
      { name: "Spa", status: "Available", icon: "💆‍♀️" },
      { name: "Conference Room", status: "Booked", icon: "🏢" },
    ],
  },
  {
    name: "Services",
    items: [
      { name: "Room Service", status: "Available", icon: "🛎️" },
      { name: "Laundry", status: "Available", icon: "👕" },
      { name: "Airport Shuttle", status: "Available", icon: "🚐" },
      { name: "Concierge", status: "Available", icon: "💁‍♂️" },
    ],
  },
];

export default function Amenities() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Amenities Management</h1>
          <p className="text-muted-foreground">Manage hotel facilities and services</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Amenity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              Available Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Ready for use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <X className="h-5 w-5" />
              Under Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Total Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-sm text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {amenityCategories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <Badge variant="outline" className={
                            item.status === "Available" ? "bg-green-100 text-green-800" :
                            item.status === "Maintenance" ? "bg-red-100 text-red-800" :
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
