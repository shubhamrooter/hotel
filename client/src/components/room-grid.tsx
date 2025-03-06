import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Room } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Loader2, BedDouble, Wrench, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function RoomGrid() {
  const { toast } = useToast();
  const { user } = useAuth();
  const canUpdateStatus = user?.role !== "super_admin";

  const { data: rooms, isLoading } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/rooms/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rooms"] });
      toast({
        title: "Room status updated",
        description: "The room status has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update room status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500";
      case "occupied":
        return "bg-blue-500/10 text-blue-500";
      case "maintenance":
        return "bg-orange-500/10 text-orange-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4" />;
      case "occupied":
        return <BedDouble className="h-4 w-4" />;
      case "maintenance":
        return <Wrench className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rooms?.map((room) => (
        <Card key={room.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Room {room.number}</h3>
                <p className="text-sm text-muted-foreground">{room.type}</p>
                <p className="text-sm text-muted-foreground">₹{room.rate}/night</p>
              </div>
              <Badge variant="secondary" className={getStatusColor(room.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(room.status)}
                  {room.status}
                </span>
              </Badge>
            </div>

            {canUpdateStatus && (
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  variant={room.status === "available" ? "default" : "outline"}
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: room.id,
                      status: "available",
                    })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  Available
                </Button>
                <Button
                  size="sm"
                  variant={room.status === "occupied" ? "default" : "outline"}
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: room.id,
                      status: "occupied",
                    })
                  }
                  disabled={updateStatusMutation.isPending}
                >
                  Occupied
                </Button>
                {user?.role === "hotel_admin" && (
                  <Button
                    size="sm"
                    variant={room.status === "maintenance" ? "default" : "outline"}
                    onClick={() =>
                      updateStatusMutation.mutate({
                        id: room.id,
                        status: "maintenance",
                      })
                    }
                    disabled={updateStatusMutation.isPending}
                  >
                    Maintenance
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}