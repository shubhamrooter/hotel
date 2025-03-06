import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, DollarSign, Download, CreditCard, Plus, Receipt, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-001",
    guestName: "John Smith",
    hotel: "Grand Plaza Hotel",
    roomNumber: "301",
    amount: 12500,
    tax: 2250,
    discount: 1000,
    total: 13750,
    status: "Paid",
    date: "2024-03-05",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-002",
    guestName: "Sarah Wilson",
    hotel: "Sunset Resort",
    roomNumber: "205",
    amount: 8750,
    tax: 1575,
    discount: 0,
    total: 10325,
    status: "Pending",
    date: "2024-03-04",
    paymentMethod: "Pending",
  },
];

// Mock data for payment methods
const paymentMethods = [
  { id: 1, name: "Credit Card", icon: "💳" },
  { id: 2, name: "Debit Card", icon: "💳" },
  { id: 3, name: "UPI", icon: "📱" },
  { id: 4, name: "Net Banking", icon: "🏦" },
];

export default function BillingInvoices() {
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const form = useForm({
    defaultValues: {
      guestName: "",
      roomNumber: "",
      checkInDate: "",
      checkOutDate: "",
      baseAmount: "",
      taxRate: "18",
      discountAmount: "0",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Billing & Invoices</h1>
          <p className="text-muted-foreground">Manage billing and view invoices</p>
        </div>
        <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Invoice</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guestName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-in Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkOutDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Check-out Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="baseAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tax rate" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Amount (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">Generate Invoice</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹4,85,000</span>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹85,000</span>
            <p className="text-sm text-muted-foreground">Across 12 invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Total Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">₹12,500</span>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Online Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">82%</span>
            <p className="text-sm text-muted-foreground">Of total transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.guestName}</TableCell>
                  <TableCell>{invoice.roomNumber}</TableCell>
                  <TableCell>₹{invoice.amount}</TableCell>
                  <TableCell>₹{invoice.tax}</TableCell>
                  <TableCell>₹{invoice.discount}</TableCell>
                  <TableCell>₹{invoice.total}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {invoice.status === "Pending" && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <Button
                key={method.id}
                variant="outline"
                className={`h-24 ${selectedPaymentMethod === method.name ? 'border-primary' : ''}`}
                onClick={() => setSelectedPaymentMethod(method.name)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="text-sm">{method.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}