import {
  findAllTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getAdminStats,
  findTasksByUser,
  reassignTaskRepo,
  updateTaskDetailsRepo,
  findDeletedTasks
} from "../repositories/task.repository.js";

export const getTasksService = async (pagination) => {
  return findAllTasks(pagination);
};

export const createTaskService = async (data) => {
  // Added startDate here so it doesn't crash when saving
  const { title, description, assignedUserIds, startDate, dueDate, difficulty } = data;

  return createTask({
    title,
    description,
    status: "TODO",
    startDate: startDate ? new Date(startDate) : null,
    dueDate : dueDate ? new Date(dueDate) : null,
    difficulty: difficulty || null,
    task_assignments: {
      create: assignedUserIds.map((id) => ({
        user: { connect: { id } }
      }))
    }
  });
};

export const reassignTaskService = async (taskId, userIds) => {
  // Delegate the Prisma queries to the repository file
  return await reassignTaskRepo(taskId, userIds);
};

export const updateTaskStatusService = (id, status) => {
  return updateTaskStatus(id, status);
};

export const deleteTaskService = (id) => {
  return deleteTask(id);
};

export const getAdminDataService = async () => {
  return await getAdminStats();
};

export const getTasksByUserService = (username) => {
  return findTasksByUser(username);
};

export const updateTaskDetailsService = (id, dueDate, difficulty, description) => {
  return updateTaskDetailsRepo(id, dueDate, difficulty, description);
};

export const getDeletedTasksService = async () => {
  return await findDeletedTasks();
};