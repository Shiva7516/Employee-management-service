import {
  loginService,
  createEmployeeService,
  refreshService,
  logoutService,
  getEmployeesService // <-- Imported new service
} from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createEmployeeService(username, password);
    res.status(201).json({ message: "Employee created", user });
  } catch (error) {
    res.status(500).json({ message: "Record already exists" });
  }
};

export const refresh = async (req, res) => {
  try {
    const result = await refreshService(req);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutService(req);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

// 👇 ADDED: Controller handler to fetch and return employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await getEmployeesService();
    res.json(employees);
  } catch (error) {
    console.error("GET EMPLOYEES ERROR:", error);
    res.status(500).json({ message: "Server error fetching employees" });
  }
};