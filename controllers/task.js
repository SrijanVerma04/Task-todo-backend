import List from "../models/List.js";
import Task from "../models/Task.js";

const taskController = {
    async addTask(req, res) {
        try {
            const { description, listId } = req.body;
            console.log(description, listId);
            const list = await List.findById(listId);
            const newTask = await Task.create({ description, completed: false, list: list});
            list.tasks.push(newTask);
            await list.save();
            return res.status(201).json({ success: true, data: newTask });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateTask(req, res) {
        try {
            const { description } = req.body;
            const list = await List.findById(req.params.listId);
            const task = list.tasks.id(req.params.taskId);
            if (!task) {
                return res.status(404).json({ success: false, error: "Task not found" });
            }
            task.description = description;
            await list.save();
            return res.status(200).json({ success: true, data: task });
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteTask(req, res) {
        try {
            const { listId, index } = req.params;
            const list = await List.findById(listId);
            if (!list) {
                return res.status(404).json({ success: false, error: "List not found" });
            }
            const task = list.tasks[index];
            list.tasks.splice(index, 1);
            await list.save();
            return res.status(200).json({ success: true, data: task });
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async toggleTask(req, res) {
        try {
            const {listId,index} = req.body;
            console.log("lididx",listId,index);
            const list = await List.findById(listId);
            console.log("list",list);
            if(list){
                const taskToUpdate = list.tasks[index];
                console.log(taskToUpdate);
                taskToUpdate.completed = !taskToUpdate.completed;
                await list.save();
                return res.status(200).json({ success: true, data: taskToUpdate });
            }
            else{
                return res.status(404).json({ success: false, error: "List not found" });
            }
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
};

export default taskController;