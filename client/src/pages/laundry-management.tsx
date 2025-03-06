import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Shirt, Clock, CheckCircle } from "lucide-react";

// Mock data for laundry requests
const laundryRequests = [
  {
    id: 1,
    roomNumber: "301",
    guestName: "John Smith",
    items: "2 Shirts, 1 Pants",
    requestTime: "2024-03-05 10:30 AM",
    deliveryDate: "2024-03-06",
    status: "Pending",
  },
  {
    id: 2,
    roomNumber: "205",
    guestName: "Sarah Wilson",
    items: "1 Dress, 3 Shirts",
    requestTime: "2024-03-05 11:00 AM",
    deliveryDate: "2024-03-06",
    status: "Processing",
  },
];

export default function LaundryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Laundry Management</h1>
          <p className="text-muted-foreground">Track and manage guest laundry requests</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">To be processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shirt className="h-5 w-5" />
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Being cleaned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Ready for Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Can be delivered</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Laundry Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Request Time</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laundryRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.roomNumber}</TableCell>
                  <TableCell>{request.guestName}</TableCell>
                  <TableCell>{request.items}</TableCell>
                  <TableCell>{request.requestTime}</TableCell>
                  <TableCell>{request.deliveryDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      request.status === "Completed" ? "bg-green-100 text-green-800" :
                      request.status === "Processing" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }>
                      {request.status}
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
    </div>
  );
}
