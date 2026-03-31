import bcrypt from "bcryptjs";
import { findUserByUsername, createEmployeeRepo, getEmployeeDetails } from "../repositories/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../services/token.service.js";
import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

export const loginService = async ({username, password}) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("Invalid username or password");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid username or password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export const refreshService = async (req) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new Error("No refresh token");

  const stored = await prisma.refreshToken.findFirst({ where: { token } });
  if (!stored) throw new Error("Invalid refresh token");

  const payload = jwt.verify(token, REFRESH_SECRET);
  const accessToken = generateAccessToken({
    id: payload.id,
    username: payload.username,
    role: payload.role
  });

  return { accessToken };
};

export const logoutService = async (req) => {
  const token = req.cookies?.refreshToken;
  if (!token) return;
  await prisma.refreshToken.deleteMany({ where: { token } });
};

export const createEmployeeService = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return createEmployeeRepo(username, hashed);
};

// 👇 ADDED: Service function to get employees
export const getEmployeesService = async () => {
  return await getEmployeeDetails();
};