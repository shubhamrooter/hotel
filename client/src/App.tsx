import { QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/hooks/use-auth"; // Import useAuth
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import ReceptionDashboard from "@/pages/reception-dashboard";
import RoomManagement from "@/components/room-management";
import StaffManagement from "@/components/staff-management";
import StaffAttendanceTable from "@/components/staff-attendance";
import HotelManagement from "@/components/hotel-management";
import DashboardLayout from "@/components/dashboard-layout";
import GuestForm from "@/components/guest-form";
import RoleManagement from "@/pages/role-management";
import AuditLogs from "@/pages/audit-logs";
import SystemSettings from "@/pages/system-settings";
import FinancialManagement from "@/pages/financial-management";
import SystemMonitoring from "@/pages/system-monitoring";
import SecurityCenter from "@/pages/security-center";
import BillingInvoices from "@/pages/billing-invoices";
import AnalyticsReports from "@/pages/analytics-reports";
import SupportTickets from "@/pages/support-tickets";
import NotificationCenter from "@/pages/notification-center";
import MessageCenter from "@/pages/message-center";
import RoomTypes from "@/pages/room-types";
import Housekeeping from "@/pages/housekeeping";
import Maintenance from "@/pages/maintenance";
import Bookings from "@/pages/bookings";
import Reviews from "@/pages/reviews";
import Shifts from "@/pages/shifts";
import Restaurant from "@/pages/restaurant";
import Amenities from "@/pages/amenities";
import Expenses from "@/pages/expenses";
import Inventory from "@/pages/inventory";
import LaundryManagement from "@/pages/laundry-management";
import GuestHistory from "@/pages/guest-history";
import SecurityLogs from "@/pages/security-logs";
import EmergencyAlerts from "@/pages/emergency-alerts";
import ShiftHandover from "@/pages/shift-handover";

interface LayoutRouteProps {
  component: React.ComponentType;
  [key: string]: any;
}

function LayoutRoute({ component: Component, ...props }: LayoutRouteProps) {
  return (
    <DashboardLayout>
      <Component {...props} />
    </DashboardLayout>
  );
}

function RoleBasedRedirect() {
  const { user } = useAuth();

  if (user?.role === "receptionist") {
    return <Redirect to="/reception" />;
  }

  return <LayoutRoute component={Dashboard} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />

      {/* Root path redirects based on role */}
      <ProtectedRoute path="/" component={RoleBasedRedirect} />

      {/* Reception Panel Routes */}
      <ProtectedRoute path="/reception" component={() => <LayoutRoute component={ReceptionDashboard} />} />
      <ProtectedRoute path="/guest-checkin" component={() => <LayoutRoute component={GuestForm} />} />
      <ProtectedRoute path="/guest-history" component={() => <LayoutRoute component={GuestHistory} />} />
      <ProtectedRoute path="/laundry" component={() => <LayoutRoute component={LaundryManagement} />} />
      <ProtectedRoute path="/security-logs" component={() => <LayoutRoute component={SecurityLogs} />} />
      <ProtectedRoute path="/emergency" component={() => <LayoutRoute component={EmergencyAlerts} />} />
      <ProtectedRoute path="/shift-handover" component={() => <LayoutRoute component={ShiftHandover} />} />

      {/* Admin Routes */}
      <ProtectedRoute path="/hotels" component={() => <LayoutRoute component={HotelManagement} />} />
      <ProtectedRoute path="/rooms" component={() => <LayoutRoute component={RoomManagement} />} />
      <ProtectedRoute path="/room-types" component={() => <LayoutRoute component={RoomTypes} />} />
      <ProtectedRoute path="/housekeeping" component={() => <LayoutRoute component={Housekeeping} />} />
      <ProtectedRoute path="/maintenance" component={() => <LayoutRoute component={Maintenance} />} />
      <ProtectedRoute path="/staff" component={() => <LayoutRoute component={StaffManagement} />} />
      <ProtectedRoute path="/attendance" component={() => <LayoutRoute component={StaffAttendanceTable} />} />
      <ProtectedRoute path="/shifts" component={() => <LayoutRoute component={Shifts} />} />
      <ProtectedRoute path="/bookings" component={() => <LayoutRoute component={Bookings} />} />
      <ProtectedRoute path="/reviews" component={() => <LayoutRoute component={Reviews} />} />
      <ProtectedRoute path="/restaurant" component={() => <LayoutRoute component={Restaurant} />} />
      <ProtectedRoute path="/amenities" component={() => <LayoutRoute component={Amenities} />} />
      <ProtectedRoute path="/roles" component={() => <LayoutRoute component={RoleManagement} />} />
      <ProtectedRoute path="/finance" component={() => <LayoutRoute component={FinancialManagement} />} />
      <ProtectedRoute path="/expenses" component={() => <LayoutRoute component={Expenses} />} />
      <ProtectedRoute path="/inventory" component={() => <LayoutRoute component={Inventory} />} />
      <ProtectedRoute path="/billing" component={() => <LayoutRoute component={BillingInvoices} />} />
      <ProtectedRoute path="/reports" component={() => <LayoutRoute component={AnalyticsReports} />} />
      <ProtectedRoute path="/monitoring" component={() => <LayoutRoute component={SystemMonitoring} />} />
      <ProtectedRoute path="/security" component={() => <LayoutRoute component={SecurityCenter} />} />
      <ProtectedRoute path="/audit-logs" component={() => <LayoutRoute component={AuditLogs} />} />
      <ProtectedRoute path="/tickets" component={() => <LayoutRoute component={SupportTickets} />} />
      <ProtectedRoute path="/notifications" component={() => <LayoutRoute component={NotificationCenter} />} />
      <ProtectedRoute path="/messages" component={() => <LayoutRoute component={MessageCenter} />} />
      <ProtectedRoute path="/settings" component={() => <LayoutRoute component={SystemSettings} />} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;