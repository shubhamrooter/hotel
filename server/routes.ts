import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertRoomSchema, insertStaffSchema, insertGuestSchema, insertHotelSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import crypto from "crypto";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads/avatars",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Middleware to check role authorization
  const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) return res.status(401).send("Unauthorized");
      if (!roles.includes(req.user.role)) return res.status(403).send("Forbidden");
      next();
    };
  };

  // Serve uploaded files
  app.use("/uploads", express.static("uploads"));

  // Hotel routes (Super Admin only)
  app.get("/api/hotels", checkRole(["super_admin"]), async (req, res) => {
    const hotels = await storage.getHotels();
    res.json(hotels);
  });

  app.post("/api/hotels", checkRole(["super_admin"]), async (req, res) => {
    const parsed = insertHotelSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const hotel = await storage.createHotel(parsed.data);
    res.status(201).json(hotel);
  });

  app.post("/api/hotels/:id/api-key", checkRole(["super_admin"]), async (req, res) => {
    try {
      const hotelId = parseInt(req.params.id);
      const apiKey = generateApiKey();
      const hotel = await storage.updateHotelApiKey(hotelId, apiKey);
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to generate API key" });
    }
  });

  // Room routes
  app.get("/api/rooms", async (req, res) => {
    const rooms = await storage.getRooms();
    res.json(rooms);
  });

  app.post("/api/rooms", checkRole(["super_admin", "hotel_admin"]), async (req, res) => {
    const parsed = insertRoomSchema.safeParse({
      ...req.body,
      hotelId: req.user?.hotelId // Ensure hotelId comes from the logged-in user
    });
    if (!parsed.success) return res.status(400).json(parsed.error);
    const room = await storage.createRoom(parsed.data);
    res.status(201).json(room);
  });

  app.patch("/api/rooms/:id/status", checkRole(["hotel_admin", "receptionist"]), async (req, res) => {
    const { status } = req.body;
    const room = await storage.updateRoomStatus(parseInt(req.params.id), status);
    res.json(room);
  });

  // Staff routes
  app.get("/api/staff", checkRole(["super_admin", "hotel_admin"]), async (req, res) => {
    const staff = await storage.getStaff();
    res.json(staff);
  });

  app.get("/api/staff/:id", checkRole(["super_admin", "hotel_admin", "receptionist"]), async (req, res) => {
    try {
      const staff = await storage.getStaff();
      const staffMember = staff.find(s => s.id === parseInt(req.params.id));
      if (!staffMember) return res.status(404).json({ message: "Staff not found" });
      res.json(staffMember);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to fetch staff member" });
    }
  });

  app.post("/api/staff", checkRole(["super_admin", "hotel_admin"]), async (req, res) => {
    const parsed = insertStaffSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const staff = await storage.createStaff(parsed.data);
    res.status(201).json(staff);
  });

  app.patch("/api/staff/:id/status", checkRole(["super_admin", "hotel_admin"]), async (req, res) => {
    try {
      const staffMember = await storage.updateStaffStatus(parseInt(req.params.id), req.body.isActive);
      res.json(staffMember);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  });

  app.post("/api/staff/:id/avatar", checkRole(["super_admin", "hotel_admin", "receptionist"]), upload.single("avatar"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      const staffMember = await storage.updateStaffAvatar(parseInt(req.params.id), avatarUrl);
      res.json(staffMember);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to upload avatar" });
    }
  });

  // Staff attendance routes
  app.get("/api/staff/attendance", checkRole(["hotel_admin"]), async (req, res) => {
    try {
      const attendance = await storage.getStaffAttendance();
      res.json(attendance);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to fetch attendance" });
    }
  });

  app.post("/api/staff/attendance", checkRole(["hotel_admin"]), async (req, res) => {
    try {
      const attendance = await storage.markStaffAttendance(req.body);
      res.json(attendance);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to mark attendance" });
    }
  });

  // Guest routes
  app.get("/api/guests", checkRole(["hotel_admin", "receptionist"]), async (req, res) => {
    const guests = await storage.getGuests();
    res.json(guests);
  });

  app.post("/api/guests", checkRole(["receptionist"]), async (req, res) => {
    const parsed = insertGuestSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const guest = await storage.createGuest(parsed.data);
    res.json(guest);
  });

  app.post("/api/guests/:id/checkout", checkRole(["receptionist"]), async (req, res) => {
    const guest = await storage.checkoutGuest(parseInt(req.params.id));
    res.json(guest);
  });

  const httpServer = createServer(app);
  return httpServer;
}