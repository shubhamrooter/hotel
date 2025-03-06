import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  LogOut,
  Hotel,
  BedDouble,
  CreditCard,
  UserPlus,
  LayoutDashboard,
  Menu,
  Settings,
  User,
  Users,
  ClipboardCheck,
  Clock,
  Coffee,
  Utensils,
  Package,
  DollarSign,
  Truck,
  BarChart,
  Bell,
  MessageSquare,
  Shield,
  Tag,
  Wrench,
  BookOpen,
  Star
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  collapsed?: boolean;
}

function NavItem({ href, icon, text, isActive, collapsed }: NavItemProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-gray-800/50",
          isActive && "bg-gray-800 text-white",
          collapsed ? "justify-center px-2" : "px-3 py-2"
        )}
      >
        {icon}
        {!collapsed && <span className="text-sm">{text}</span>}
      </Button>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSidebarItems = () => {
    if (user?.role === "hotel_admin") {
      return [
        // Dashboard
        {
          href: "/",
          icon: <LayoutDashboard className="h-5 w-5" />,
          text: "Dashboard"
        },
        // Room Management
        {
          href: "/rooms",
          icon: <BedDouble className="h-5 w-5" />,
          text: "Room Management"
        },
        {
          href: "/room-types",
          icon: <Tag className="h-5 w-5" />,
          text: "Room Types"
        },
        {
          href: "/housekeeping",
          icon: <Coffee className="h-5 w-5" />,
          text: "Housekeeping"
        },
        {
          href: "/maintenance",
          icon: <Wrench className="h-5 w-5" />,
          text: "Maintenance"
        },
        // Guest Services
        {
          href: "/guests",
          icon: <UserPlus className="h-5 w-5" />,
          text: "Guest Management"
        },
        {
          href: "/bookings",
          icon: <BookOpen className="h-5 w-5" />,
          text: "Bookings"
        },
        {
          href: "/reviews",
          icon: <Star className="h-5 w-5" />,
          text: "Guest Reviews"
        },
        // Staff Management
        {
          href: "/staff",
          icon: <Users className="h-5 w-5" />,
          text: "Staff Management"
        },
        {
          href: "/attendance",
          icon: <ClipboardCheck className="h-5 w-5" />,
          text: "Staff Attendance"
        },
        {
          href: "/shifts",
          icon: <Clock className="h-5 w-5" />,
          text: "Shift Schedule"
        },
        // Services
        {
          href: "/restaurant",
          icon: <Utensils className="h-5 w-5" />,
          text: "Restaurant"
        },
        {
          href: "/amenities",
          icon: <Package className="h-5 w-5" />,
          text: "Amenities"
        },
        // Finance
        {
          href: "/billing",
          icon: <CreditCard className="h-5 w-5" />,
          text: "Billing"
        },
        {
          href: "/expenses",
          icon: <DollarSign className="h-5 w-5" />,
          text: "Expenses"
        },
        {
          href: "/inventory",
          icon: <Truck className="h-5 w-5" />,
          text: "Inventory"
        },
        // Reports & Communication
        {
          href: "/reports",
          icon: <BarChart className="h-5 w-5" />,
          text: "Reports"
        },
        {
          href: "/messages",
          icon: <MessageSquare className="h-5 w-5" />,
          text: "Messages"
        },
        {
          href: "/notifications",
          icon: <Bell className="h-5 w-5" />,
          text: "Notifications"
        },
        // Settings & Security
        {
          href: "/security",
          icon: <Shield className="h-5 w-5" />,
          text: "Security"
        },
        {
          href: "/settings",
          icon: <Settings className="h-5 w-5" />,
          text: "Settings"
        }
      ];
    } else if (user?.role === "receptionist") {
      return [
        {
          href: "/reception",
          icon: <LayoutDashboard className="h-5 w-5" />,
          text: "Reception Dashboard"
        },
        {
          href: "/guest-checkin",
          icon: <UserPlus className="h-5 w-5" />,
          text: "Guest Check-in"
        },
        {
          href: "/rooms",
          icon: <BedDouble className="h-5 w-5" />,
          text: "Room Management"
        },
        {
          href: "/billing",
          icon: <CreditCard className="h-5 w-5" />,
          text: "Billing & Payments"
        },
        {
          href: "/laundry",
          icon: <Package className="h-5 w-5" />,
          text: "Laundry Services"
        },
        {
          href: "/guest-history",
          icon: <Clock className="h-5 w-5" />,
          text: "Guest History"
        },
        {
          href: "/security-logs",
          icon: <Shield className="h-5 w-5" />,
          text: "Security Logs"
        }
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#12181A] transform transition-transform duration-200 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 text-white">
              <Hotel className="h-6 w-6" />
              <h1 className="text-xl font-semibold">StayGuard</h1>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {getSidebarItems().map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                text={item.text}
                isActive={location === item.href}
              />
            ))}
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:block bg-[#12181A] transition-all duration-200 border-r border-border",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="h-screen flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2 text-white">
                <Hotel className="h-6 w-6" />
                <h1 className="text-xl font-semibold">StayGuard</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {getSidebarItems().map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                text={item.text}
                isActive={location === item.href}
                collapsed={collapsed}
              />
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-[#12181A] py-4 px-6 flex justify-between items-center border-b border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 text-gray-400 hover:text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}