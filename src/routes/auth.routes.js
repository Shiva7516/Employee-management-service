import express from "express";
import {
  login,
  refresh,
  logout,
  createEmployee,
  getEmployees // <-- Imported controller
} from "../controllers/login.controller.js";

import { verifyToken, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", verifyToken, logout);

// 👇 ADDED: The actual API route
router.get("/employees", verifyToken, getEmployees);

router.post("/users", verifyToken, requireRole("ADMIN"), createEmployee);

export default router;