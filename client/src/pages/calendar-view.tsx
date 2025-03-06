import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">View and manage schedules and events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                March 2024
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="multiple" className="rounded-md border" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border">
                <p className="font-medium">Staff Meeting</p>
                <p className="text-sm text-muted-foreground">March 6, 2024</p>
                <p className="text-sm text-muted-foreground">10:00 AM</p>
              </div>
              <div className="p-3 rounded-lg border">
                <p className="font-medium">Hotel Inspection</p>
                <p className="text-sm text-muted-foreground">March 8, 2024</p>
                <p className="text-sm text-muted-foreground">2:00 PM</p>
              </div>
              <div className="p-3 rounded-lg border">
                <p className="font-medium">Training Session</p>
                <p className="text-sm text-muted-foreground">March 10, 2024</p>
                <p className="text-sm text-muted-foreground">11:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
