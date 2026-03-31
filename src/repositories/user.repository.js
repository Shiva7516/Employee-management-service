import prisma from "../config/prisma.js";

export const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username }
  });
};

export const createEmployeeRepo = async (username, password) => {
  return prisma.user.create({
    data: {
      username,
      password,
      role: "EMPLOYEE",
      createdDateTime: undefined
    },
    select: {
      id: true,
      username: true,
      role: true,
      createdDateTime: true
    }
  });
};

// 👇 ADDED: Fetch all employees from the DB
export const getEmployeeDetails = async () => {
  return prisma.user.findMany({
    where: { role: "EMPLOYEE" },
    select: { id: true, username: true }
  });
};