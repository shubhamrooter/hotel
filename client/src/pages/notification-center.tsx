import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Backup Completed",
    message: "Daily system backup completed successfully",
    timestamp: "10 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    title: "High Server Load",
    message: "Server CPU usage exceeded 80%",
    timestamp: "30 minutes ago",
  },
  {
    id: 3,
    type: "info",
    title: "New Staff Member",
    message: "New staff member added to Grand Plaza Hotel",
    timestamp: "1 hour ago",
  },
];

export default function NotificationCenter() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notification Center</h1>
        <p className="text-muted-foreground">Manage system notifications and alerts</p>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          onClick={() => setFilter("unread")}
        >
          Unread
        </Button>
        <Button
          variant={filter === "important" ? "default" : "outline"}
          onClick={() => setFilter("important")}
        >
          Important
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 rounded-lg border"
              >
                {notification.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : notification.type === "warning" ? (
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                ) : (
                  <Info className="h-5 w-5 text-blue-500" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
