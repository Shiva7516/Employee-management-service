import {
  createCommentRepo,
  getCommentsByTaskRepo,
  updateCommentRepo
} from "../repositories/comment.repository.js";

import prisma from "../config/prisma.js";

export const createCommentService = (taskId, userId, comment) =>
  createCommentRepo(taskId, userId, comment);

export const getCommentsService = (taskId) =>
  getCommentsByTaskRepo(taskId);

export const updateCommentService = async (id, comment) => {
  // Ensure the ID is passed as a Number for Prisma
  const commentId = Number(id);

  const existing = await prisma.task_comments.findUnique({
    where: { id: commentId } 
  });

  if (!existing) {
    throw new Error("Comment not found");
  }

  const createdTime = new Date(existing.created_at).getTime();
  const now = Date.now();

  const diffHours = (now - createdTime) / (1000 * 60 * 60);

  if (diffHours > 4) {
    throw new Error("Edit window expired");
  }

  return updateCommentRepo(commentId, comment);
};