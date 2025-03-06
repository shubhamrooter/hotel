import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  DollarSign,
  FileText,
  TrendingUp,
  Shield,
  Settings,
  Download,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const paymentGatewaySchema = z.object({
  stripeEnabled: z.boolean(),
  stripePublicKey: z.string().min(1, "Required"),
  stripeSecretKey: z.string().min(1, "Required"),
  razorpayEnabled: z.boolean(),
  razorpayKeyId: z.string().min(1, "Required"),
  razorpayKeySecret: z.string().min(1, "Required"),
});

type PaymentGatewayValues = z.infer<typeof paymentGatewaySchema>;

export default function FinancialManagement() {
  const [selectedReport, setSelectedReport] = useState("daily");
  const [dateRange, setDateRange] = useState("last7");

  const form = useForm<PaymentGatewayValues>({
    resolver: zodResolver(paymentGatewaySchema),
    defaultValues: {
      stripeEnabled: false,
      stripePublicKey: "",
      stripeSecretKey: "",
      razorpayEnabled: false,
      razorpayKeyId: "",
      razorpayKeySecret: "",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <p className="text-muted-foreground">Manage revenue, reports, and payment settings</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">₹4,85,000</span>
                <div className="text-xs text-white/80">This month</div>
              </div>
              <DollarSign className="h-4 w-4 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">₹52,450</span>
                <div className="text-xs text-white/80">15 invoices</div>
              </div>
              <FileText className="h-4 w-4 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">₹1,25,000</span>
                <div className="text-xs text-white/80">This month</div>
              </div>
              <TrendingUp className="h-4 w-4 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">245</span>
                <div className="text-xs text-white/80">This month</div>
              </div>
              <Calendar className="h-4 w-4 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Financial Reports
            </div>
            <div className="flex gap-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="thisMonth">This month</SelectItem>
                  <SelectItem value="lastMonth">Last month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Revenue</SelectItem>
                  <SelectItem value="monthly">Monthly Revenue</SelectItem>
                  <SelectItem value="profit">Profit/Loss</SelectItem>
                  <SelectItem value="tax">Tax Report</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded-lg">
            <p className="text-muted-foreground">Report visualization will be displayed here</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Gateway Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Gateway Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="space-y-4">
              <div className="grid gap-4">
                <FormField
                  name="stripeEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>Enable Stripe</FormLabel>
                        <FormDescription>Accept payments via Stripe</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch("stripeEnabled") && (
                  <div className="grid gap-4 pl-6">
                    <FormField
                      name="stripePublicKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stripe Public Key</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="stripeSecretKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stripe Secret Key</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="grid gap-4">
                <FormField
                  name="razorpayEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>Enable Razorpay</FormLabel>
                        <FormDescription>Accept payments via Razorpay</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch("razorpayEnabled") && (
                  <div className="grid gap-4 pl-6">
                    <FormField
                      name="razorpayKeyId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Razorpay Key ID</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="razorpayKeySecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Razorpay Key Secret</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" className="mt-6">Save Payment Settings</Button>
          </Form>
        </CardContent>
      </Card>

      {/* Compliance & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance & Security Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">PCI Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Compliant</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">SSL Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Valid (Expires in 240 days)</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Data Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">AES-256 Enabled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
