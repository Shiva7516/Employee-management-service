import express from "express";
import {
  getTasks,
  getTasksByUser,
  createTask,
  updateStatus,
  deleteTask,
  getAdminData,
  reassignTask,
  updateDetails,
  getDeletedTasks
} from "../controllers/task.controller.js";
import { requireRole, verifyToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { createTaskDTO, updateStatusDTO } from "../dto/task.dto.js";

const router = express.Router();

router.get('/admin-data', verifyToken, requireRole('ADMIN'), getAdminData);
router.get('/', verifyToken, getTasks);
router.get("/user/:username", verifyToken, getTasksByUser);
router.post("/add", verifyToken, requireRole('ADMIN'), validate(createTaskDTO), createTask);
router.put("/:id", verifyToken, validate(updateStatusDTO), updateStatus);
router.delete("/:id", verifyToken, deleteTask);
router.put("/:id/assign", verifyToken, requireRole('ADMIN'), reassignTask);
router.put("/:id/details", verifyToken, updateDetails);
router.get('/deleted', verifyToken, requireRole('ADMIN'), getDeletedTasks);

export default router;
