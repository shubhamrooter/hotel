import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Plus, AlertTriangle, Package, BarChart2 } from "lucide-react";

// Mock data for inventory items
const mockInventory = [
  {
    id: 1,
    name: "Bath Towels",
    category: "Linens",
    inStock: 250,
    minRequired: 100,
    lastRestocked: "2024-03-01",
    status: "Adequate",
  },
  {
    id: 2,
    name: "Toilet Paper",
    category: "Supplies",
    inStock: 80,
    minRequired: 100,
    lastRestocked: "2024-03-03",
    status: "Low Stock",
  },
];

// Mock data for inventory categories
const inventoryStats = {
  totalItems: 1250,
  lowStock: 5,
  recentDeliveries: 8,
  pendingOrders: 3,
};

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage hotel supplies</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <BarChart2 className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
            <p className="text-sm text-muted-foreground">In stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.lowStock}</div>
            <p className="text-sm text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Recent Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.recentDeliveries}</div>
            <p className="text-sm text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.pendingOrders}</div>
            <p className="text-sm text-muted-foreground">To be delivered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Min Required</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.inStock}</TableCell>
                  <TableCell>{item.minRequired}</TableCell>
                  <TableCell>{item.lastRestocked}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      item.status === "Adequate" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Restock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
