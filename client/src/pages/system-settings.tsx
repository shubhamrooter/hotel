import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Globe,
  Database,
  Shield,
  Upload,
  Download,
  Users,
  Key,
  Mail,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const settingsSchema = z.object({
  timezone: z.string(),
  currency: z.string(),
  locale: z.string(),
  dateFormat: z.string(),
  twoFactorAuth: z.boolean(),
  passwordExpiry: z.number().min(30).max(180),
  minPasswordLength: z.number().min(8).max(32),
  specialCharRequired: z.boolean(),
  numbersRequired: z.boolean(),
  backupFrequency: z.string(),
  backupRetention: z.number().min(7).max(365),
  emailNotifications: z.boolean(),
  autoLockTimeout: z.number().min(5).max(60),
});

type SettingsValues = z.infer<typeof settingsSchema>;

export default function SystemSettings() {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      timezone: "UTC",
      currency: "USD",
      locale: "en-US",
      dateFormat: "MM/DD/YYYY",
      twoFactorAuth: false,
      passwordExpiry: 90,
      minPasswordLength: 12,
      specialCharRequired: true,
      numbersRequired: true,
      backupFrequency: "daily",
      backupRetention: 30,
      emailNotifications: true,
      autoLockTimeout: 15,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure global system parameters</p>
      </div>

      <Form {...form}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Regional Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                        <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="dateFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Format</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Two-Factor Authentication</FormLabel>
                      <FormDescription>
                        Require 2FA for all admin accounts
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="passwordExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Expiry (days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={30} max={180} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="minPasswordLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Password Length</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={8} max={32} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="specialCharRequired"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Require Special Characters</FormLabel>
                      <FormDescription>
                        Passwords must contain special characters
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="autoLockTimeout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auto-lock Timeout (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={5} max={60} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                name="backupFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backup Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                name="backupRetention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Backup Retention (days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={7} max={365} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Backup
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Restore Backup
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>
                        Send notifications for important system events
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit">Save Changes</Button>
        </div>
      </Form>
    </div>
  );
}