import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["super_admin", "hotel_admin", "receptionist"] }).notNull(),
  hotelId: integer("hotel_id"),
});

export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactNumber: text("contact_number").notNull(),
  apiKey: text("api_key").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  details: jsonb("details"),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  permissions: text("permissions").array(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  number: text("number").notNull(),
  type: text("type", { enum: ["standard", "deluxe", "suite"] }).notNull(),
  status: text("status", { enum: ["available", "occupied", "maintenance"] }).notNull().default("available"),
  rate: integer("rate").notNull(),
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  contact: text("contact").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  avatarUrl: text("avatar_url"),
  joinDate: timestamp("join_date").notNull().defaultNow(),
  lastActive: timestamp("last_active").notNull().defaultNow(),
});

export const guests = pgTable("guests", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  name: text("name").notNull(),
  contact: text("contact").notNull(),
  idNumber: text("id_number").notNull(),
  roomId: integer("room_id").notNull(),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out"),
});

export const staffAttendance = pgTable("staff_attendance", {
  id: serial("id").primaryKey(),
  staffId: integer("staff_id").notNull(),
  hotelId: integer("hotel_id").notNull(),
  checkIn: timestamp("check_in").notNull(),
  checkOut: timestamp("check_out"),
  status: text("status", { enum: ["present", "absent", "late"] }).notNull(),
  note: text("note"),
});

export const billing = pgTable("billing", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  guestId: integer("guest_id").notNull(),
  roomId: integer("room_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status", { enum: ["pending", "paid", "cancelled"] }).notNull(),
  invoiceNumber: text("invoice_number").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  paidAt: timestamp("paid_at"),
  items: jsonb("items").notNull(),
});

export const laundryRequests = pgTable("laundry_requests", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  guestId: integer("guest_id").notNull(),
  roomNumber: text("room_number").notNull(),
  items: text("items").notNull(),
  requestTime: timestamp("request_time").notNull().defaultNow(),
  deliveryDate: timestamp("delivery_date").notNull(),
  status: text("status", { enum: ["pending", "processing", "completed", "delivered"] }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  type: text("type", { enum: ["check_in", "check_out", "incident", "suspicious_activity"] }).notNull(),
  guestId: integer("guest_id"),
  roomNumber: text("room_number"),
  description: text("description").notNull(),
  reportedBy: integer("reported_by").notNull(),
  status: text("status", { enum: ["pending", "investigating", "resolved"] }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  actionTaken: text("action_taken"),
});

export const shiftHandovers = pgTable("shift_handovers", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  outgoingStaffId: integer("outgoing_staff_id").notNull(),
  incomingStaffId: integer("incoming_staff_id").notNull(),
  shift: text("shift", { enum: ["morning", "afternoon", "night"] }).notNull(),
  handoverTime: timestamp("handover_time").notNull(),
  pendingTasks: jsonb("pending_tasks"),
  importantNotes: text("important_notes"),
  status: text("status", { enum: ["pending", "completed"] }).notNull(),
});

export const guestHistory = pgTable("guest_history", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  guestId: integer("guest_id").notNull(),
  roomPreference: text("room_preference"),
  totalStays: integer("total_stays").notNull().default(0),
  lastStayDate: timestamp("last_stay_date"),
  specialRequests: text("special_requests"),
  status: text("status", { enum: ["regular", "vip"] }).notNull().default("regular"),
  totalSpent: integer("total_spent").notNull().default(0),
  notes: text("notes"),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  hotelId: integer("hotel_id").notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type", { enum: ["info", "warning", "alert"] }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertHotelSchema = createInsertSchema(hotels);
export const insertAuditLogSchema = createInsertSchema(auditLogs);
export const insertApiKeySchema = createInsertSchema(apiKeys);
export const insertRoomSchema = z.object({
  number: z.string().min(1, "Room number is required"),
  type: z.enum(["standard", "deluxe", "suite"]),
  rate: z.number().min(1, "Room rate must be greater than 0"),
  status: z.enum(["available", "occupied", "maintenance"]).default("available"),
  hotelId: z.number().min(1).default(1)
});
export const insertStaffSchema = createInsertSchema(staff);
export const insertGuestSchema = createInsertSchema(guests, {
  checkIn: z.string().transform((date) => new Date(date)),
  checkOut: z.string().transform((date) => new Date(date)),
});
export const insertStaffAttendanceSchema = createInsertSchema(staffAttendance);
export const insertBillingSchema = createInsertSchema(billing);
export const insertLaundryRequestSchema = createInsertSchema(laundryRequests);
export const insertSecurityLogSchema = createInsertSchema(securityLogs);
export const insertShiftHandoverSchema = createInsertSchema(shiftHandovers);
export const insertGuestHistorySchema = createInsertSchema(guestHistory);
export const insertNotificationSchema = createInsertSchema(notifications);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertAuditLog = z.infer<typeof insertAuditLogSchema>;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type InsertStaffAttendance = z.infer<typeof insertStaffAttendanceSchema>;
export type InsertBilling = z.infer<typeof insertBillingSchema>;
export type InsertLaundryRequest = z.infer<typeof insertLaundryRequestSchema>;
export type InsertSecurityLog = z.infer<typeof insertSecurityLogSchema>;
export type InsertShiftHandover = z.infer<typeof insertShiftHandoverSchema>;
export type InsertGuestHistory = z.infer<typeof insertGuestHistorySchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type User = typeof users.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Room = typeof rooms.$inferSelect;
export type Staff = typeof staff.$inferSelect;
export type Guest = typeof guests.$inferSelect;
export type StaffAttendance = typeof staffAttendance.$inferSelect;
export type Billing = typeof billing.$inferSelect;
export type LaundryRequest = typeof laundryRequests.$inferSelect;
export type SecurityLog = typeof securityLogs.$inferSelect;
export type ShiftHandover = typeof shiftHandovers.$inferSelect;
export type GuestHistory = typeof guestHistory.$inferSelect;
export type Notification = typeof notifications.$inferSelect;