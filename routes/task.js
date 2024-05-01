import express from "express";
import task from "../controllers/task.js";

const taskRouter = express.Router();

taskRouter.post("/", task.addTask);
taskRouter.delete("/:listId/:index", task.deleteTask);
taskRouter.put("/toggle", task.toggleTask);

export default taskRouter;