import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Utensils, Coffee, DollarSign } from "lucide-react";

// Mock data for orders
const mockOrders = [
  {
    id: 1,
    roomNumber: "301",
    items: ["Club Sandwich", "Fresh Juice"],
    status: "In Progress",
    total: 450,
    orderTime: "10:30 AM",
  },
  {
    id: 2,
    roomNumber: "205",
    items: ["Butter Chicken", "Naan", "Lassi"],
    status: "Delivered",
    total: 850,
    orderTime: "10:15 AM",
  },
];

// Mock data for menu items
const menuCategories = [
  {
    name: "Breakfast",
    items: [
      { name: "Continental Breakfast", price: 350 },
      { name: "Indian Breakfast", price: 400 },
    ],
  },
  {
    name: "Main Course",
    items: [
      { name: "Butter Chicken", price: 550 },
      { name: "Vegetable Biryani", price: 450 },
    ],
  },
];

export default function Restaurant() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Restaurant Management</h1>
          <p className="text-muted-foreground">Manage food service and orders</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Today's Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">Total orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Today's Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <p className="text-sm text-muted-foreground">From restaurant</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Order Time</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.roomNumber}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{order.orderTime}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Update Status</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {menuCategories.map((category) => (
              <div key={category.name}>
                <h3 className="font-medium mb-2">{category.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span>₹{item.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
