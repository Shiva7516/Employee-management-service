import { date, success } from "zod";
import {
  getTasksService,
  createTaskService,
  updateTaskStatusService,
  deleteTaskService,
  getAdminDataService,
  getTasksByUserService,
  reassignTaskService,
  updateTaskDetailsService,
  getDeletedTasksService
} from "../services/task.service.js";

import { getPagination } from "../utils/pagination.js";

export const getTasks = async (req, res) => {

  const pagination = getPagination(req);

  const tasks = await getTasksService(pagination);

  res.json(tasks);

};

export const createTask = async (req, res) => {
try {
    const task = await createTaskService(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error)
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  await updateTaskStatusService(Number(id), status);

  res.json({ message: "Status updated" });

};

export const deleteTask = async (req, res) => {

  const { id } = req.params;

  await deleteTaskService(Number(id));

  res.json({ message: "Task soft deleted" });

};

export const getAdminData = async (req, res) => {
  try {
    const stats = await getAdminDataService();
    res.json(stats);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
};

/* GET TASKS BY USER */
export const getTasksByUser = async (req, res) => {

  const { username } = req.params;

  const tasks = await getTasksByUserService(username);

  res.json(tasks);

};

export const reassignTask = async (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body;
  await reassignTaskService(Number(id), userIds);
  res.json({ message: "Task reassigned" });
};

// Add this at the bottom:
export const updateDetails = async (req, res) => {
  const { id } = req.params;
  const { dueDate, difficulty, description } = req.body; // Note: Ignoring difficulty as it's not in your Prisma Schema
  await updateTaskDetailsService(Number(id), dueDate, difficulty, description);
  res.json({ message: "Task details updated" });
};

export const getDeletedTasks = async (req, res) => {
  try {
    const tasks = await getDeletedTasksService();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};