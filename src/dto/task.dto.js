import { z } from "zod";

export const createTaskDTO = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  assignedUserIds: z.array(z.number()),
  startDate: z.any().optional()
});

export const updateStatusDTO = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"])
});
