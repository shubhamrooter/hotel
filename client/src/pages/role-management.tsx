import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, UserCog, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RoleManagement() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Role & Permission Management</h1>
        <p className="text-muted-foreground">Manage user roles and access permissions</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Role Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Role assignments will be populated here */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permission Sets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Super Admin</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Full system access</li>
                  <li>✓ Manage hotels and admins</li>
                  <li>✓ System configuration</li>
                  <li>✓ View audit logs</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Hotel Admin</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Manage hotel staff</li>
                  <li>✓ Room management</li>
                  <li>✓ View hotel reports</li>
                  <li>✓ Staff attendance</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Receptionist</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Guest check-in/out</li>
                  <li>✓ View room status</li>
                  <li>✓ Basic reports</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}