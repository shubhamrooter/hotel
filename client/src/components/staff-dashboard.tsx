import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Staff, Room, Guest } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import {
  BedDouble,
  Users,
  Clock,
  Calendar,
  Upload,
  Loader2
} from "lucide-react";

export default function StaffDashboard({ staffMember }: { staffMember: Staff }) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const { data: rooms } = useQuery<Room[]>({
    queryKey: ["/api/rooms"],
  });

  const { data: guests } = useQuery<Guest[]>({
    queryKey: ["/api/guests"],
  });

  const occupiedRooms = rooms?.filter((room) => room.status === "occupied").length || 0;
  const totalGuests = guests?.length || 0;
  const activeGuests = guests?.filter((guest) => !guest.checkOut).length || 0;

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`/api/staff/${staffMember.id}/avatar`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload avatar");

      const data = await res.json();
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });

      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your staff profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={staffMember.avatarUrl || ""} />
                  <AvatarFallback>
                    {staffMember.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatar-upload"
                    onChange={handleAvatarUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={uploading}
                      asChild
                    >
                      <span>
                        {uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{staffMember.name}</h3>
                <p className="text-sm text-muted-foreground">{staffMember.role}</p>
                <p className="text-sm text-muted-foreground">{staffMember.contact}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 flex-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Occupied Rooms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{occupiedRooms}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{activeGuests}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{totalGuests}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Join Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {format(new Date(staffMember.joinDate), "PP")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
