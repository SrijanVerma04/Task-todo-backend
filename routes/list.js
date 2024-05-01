import express from "express";
import list from "../controllers/List.js";

const listRouter = express.Router();

listRouter.get("/:userId", list.getAllLists);
listRouter.post("/", list.createList);
listRouter.put("/:listId", list.updateList);
listRouter.delete("/:listId", list.deleteList);

export default listRouter;