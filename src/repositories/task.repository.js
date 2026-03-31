import prisma from "../config/prisma.js";

export const findAllTasks = ({ skip, limit }) => {
  return prisma.tasks.findMany({
    skip,
    take: limit,
    where: { deletedAt: null },
    include: {
      task_assignments: {
        include: {
          user: {
            select: { id: true, username: true }
          }
        }
      }
    }
  });
};

export const createTask = (data) => {

  return prisma.tasks.create({ data });

};

// Added the Prisma reassign logic here
export const reassignTaskRepo = async (taskId, userIds) => {
  await prisma.task_assignments.deleteMany({ where: { task_id: taskId } });
  
  if (userIds && userIds.length > 0) {
    await prisma.task_assignments.createMany({
      data: userIds.map(id => ({ task_id: taskId, user_id: id }))
    });
  }
};

export const updateTaskStatus = (id, status) => {

  return prisma.tasks.update({
    where: { id },
    data: { status }
  });

};

export const deleteTask = (id) => {

  return prisma.tasks.update({
    where: { id },
    data: {
      deletedAt: new Date()
    }
  });

};

export const getAdminStats = async () => {

  const todo = await prisma.tasks.count({
    where: {
      status: "TODO",
      deletedAt: null
    }
  });

  const progress = await prisma.tasks.count({
    where: {
      status: "IN_PROGRESS",
      deletedAt: null
    }
  });

  const done = await prisma.tasks.count({
    where: {
      status: "DONE",
      deletedAt: null
    }
  });

  return {
    todo,
    progress,
    done
  };

};

export const findTasksByUser = (username) => {

  return prisma.tasks.findMany({
    where: {
      task_assignments: {
        some: {
          user: {
            username: username
          }
        }
      },
      deletedAt: null
    },
    include: {
      task_assignments: {
        include: { user: true }
      }
    }
  });

};

export const updateTaskDetailsRepo = (id, dueDate, difficulty, description) => {
  return prisma.tasks.update({
    where: { id },
    data: { 
      ...(dueDate !== undefined && {
        dueDate: dueDate ? new Date(dueDate) : null
      }),
      ...(difficulty !== undefined && {
        difficulty: difficulty || null
      }),
      ...(description !== undefined && { description: description })
     }
  });
};

export const findDeletedTasks = () => {
  return prisma.tasks.findMany({
    where: { 
      deletedAt: { not: null } 
    },
    include: {
      task_assignments: {
        include: {
          user: {
            select: { id: true, username: true }
          }
        }
      }
    }
  });
};