import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    guestName: "John Smith",
    roomNumber: "301",
    rating: 5,
    comment: "Excellent service and very clean rooms. Staff was very helpful.",
    date: "2024-03-05",
    status: "Published",
    likes: 12,
  },
  {
    id: 2,
    guestName: "Sarah Wilson",
    roomNumber: "205",
    rating: 4,
    comment: "Good experience overall. Breakfast could be better.",
    date: "2024-03-04",
    status: "Pending",
    likes: 8,
  },
];

export default function Reviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Guest Reviews</h1>
        <p className="text-muted-foreground">Manage and monitor guest feedback</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5/5</div>
            <p className="text-sm text-muted-foreground">Based on 150 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              Positive Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-sm text-muted-foreground">Satisfaction rate</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.guestName}</TableCell>
                  <TableCell>{review.roomNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="font-bold mr-1">{review.rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      review.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }>
                      {review.status}
                    </Badge>
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
