import List from "../models/List.js";
import User from "../models/User.js";

const listController = {
    async getAllLists(req, res) {
        try {
            const lists = await List.find({ user: req.params.userId });
            return res.status(200).json({ success: true, data: lists });
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async createList(req, res) {
        try {
            const { title, userId } = req.body;
            if (!title || !userId) {
                return res.status(400).json({ success: false, error: 'Missing fields' });
            }
            const user = await User.findById(userId); 
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            const newList = await List.create({ title, user: userId});
            return res.status(201).json({ success: true, data: newList });
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async updateList(req, res) {
        try {
            const { title } = req.body;
            const updatedList = await List.findByIdAndUpdate(req.params.listId, { title }, { new: true });
            if (!updatedList) {
                return res.status(404).json({ success: false, error: "List not found" });
            }
            return res.status(200).json({ success: true, data: updatedList });
        } 
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },
    async deleteList(req, res) {
        try {
            const deletedList = await List.findByIdAndDelete(req.params.listId);
            if (!deletedList) {
                return res.status(404).json({ success: false, error: "List not found" });
            }
            return res.status(200).json({ success: true, data: deletedList });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

export default listController;