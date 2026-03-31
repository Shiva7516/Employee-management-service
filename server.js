import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./src/routes/task.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import commentRoutes from './src/routes/comment.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use('/api', commentRoutes);


app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
