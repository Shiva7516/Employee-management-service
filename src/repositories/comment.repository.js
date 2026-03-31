import prisma from "../config/prisma.js";

export const createCommentRepo = (taskId, userId, comment) => {
  return prisma.task_comments.create({
    data: { 
      task_id: Number(taskId), 
      user_id: Number(userId), 
      comment 
    }
  });
};

export const getCommentsByTaskRepo = (taskId) => {
  return prisma.task_comments.findMany({
    where: { task_id: Number(taskId) },
    include: {
      user: { select: { username: true } }
    },
    orderBy: { created_at: 'desc' }
  });
};

export const updateCommentRepo = (id, comment) => {
  return prisma.task_comments.update({
    where: { id: Number(id) }, // Typecast to Int
    data: { comment }
  });
};