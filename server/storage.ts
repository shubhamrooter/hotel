import { users, rooms, staff, guests, hotels, staffAttendance, type User, type Room, type Staff, type Guest, type Hotel, type StaffAttendance, type InsertUser, type InsertRoom, type InsertStaff, type InsertGuest, type InsertHotel, type InsertStaffAttendance } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Session store
  sessionStore: session.Store;

  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Hotel operations
  getHotels(): Promise<Hotel[]>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  updateHotelApiKey(id: number, apiKey: string): Promise<Hotel>;

  // Room operations
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoomStatus(id: number, status: string): Promise<Room>;

  // Staff operations
  getStaff(): Promise<Staff[]>;
  createStaff(staffData: InsertStaff): Promise<Staff>;
  updateStaffStatus(id: number, isActive: boolean): Promise<Staff>;
  updateStaffAvatar(id: number, avatarUrl: string): Promise<Staff>;

  // Guest operations
  getGuests(): Promise<Guest[]>;
  createGuest(guest: InsertGuest): Promise<Guest>;
  checkoutGuest(id: number): Promise<Guest>;

  // Staff attendance operations
  getStaffAttendance(): Promise<StaffAttendance[]>;
  markStaffAttendance(attendance: InsertStaffAttendance): Promise<StaffAttendance>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Hotel operations
  async getHotels(): Promise<Hotel[]> {
    return await db.select().from(hotels);
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const [hotel] = await db.insert(hotels).values(insertHotel).returning();
    return hotel;
  }

  async updateHotelApiKey(id: number, apiKey: string): Promise<Hotel> {
    const [hotel] = await db
      .update(hotels)
      .set({ apiKey })
      .where(eq(hotels.id, id))
      .returning();
    if (!hotel) throw new Error("Hotel not found");
    return hotel;
  }

  // Room operations
  async getRooms(): Promise<Room[]> {
    return await db.select().from(rooms);
  }

  async getRoom(id: number): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));
    return room;
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const [room] = await db.insert(rooms).values(insertRoom).returning();
    return room;
  }

  async updateRoomStatus(id: number, status: string): Promise<Room> {
    const [room] = await db
      .update(rooms)
      .set({ status })
      .where(eq(rooms.id, id))
      .returning();
    if (!room) throw new Error("Room not found");
    return room;
  }

  // Staff operations
  async getStaff(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async createStaff(staffData: InsertStaff): Promise<Staff> {
    const [newStaff] = await db.insert(staff).values(staffData).returning();
    return newStaff;
  }

  async updateStaffStatus(id: number, isActive: boolean): Promise<Staff> {
    const [updatedStaff] = await db
      .update(staff)
      .set({ isActive })
      .where(eq(staff.id, id))
      .returning();
    if (!updatedStaff) throw new Error("Staff not found");
    return updatedStaff;
  }

  async updateStaffAvatar(id: number, avatarUrl: string): Promise<Staff> {
    const [updatedStaff] = await db
      .update(staff)
      .set({ avatarUrl })
      .where(eq(staff.id, id))
      .returning();
    if (!updatedStaff) throw new Error("Staff not found");
    return updatedStaff;
  }

  // Guest operations
  async getGuests(): Promise<Guest[]> {
    return await db.select().from(guests);
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const [guest] = await db.insert(guests).values(insertGuest).returning();
    return guest;
  }

  async checkoutGuest(id: number): Promise<Guest> {
    const [guest] = await db
      .update(guests)
      .set({ checkOut: new Date() })
      .where(eq(guests.id, id))
      .returning();
    if (!guest) throw new Error("Guest not found");
    return guest;
  }

  // Staff attendance operations
  async getStaffAttendance(): Promise<StaffAttendance[]> {
    return await db.select().from(staffAttendance);
  }

  async markStaffAttendance(insertAttendance: InsertStaffAttendance): Promise<StaffAttendance> {
    const [attendance] = await db
      .insert(staffAttendance)
      .values(insertAttendance)
      .returning();
    return attendance;
  }
}

export const storage = new DatabaseStorage();