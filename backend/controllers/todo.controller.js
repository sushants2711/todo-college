import todoModel from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    try {
        const { text } = req.body;

        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        const loggedInUser = req.user._id;

        const newTodo = new todoModel({
            text,
            user: loggedInUser
        });

        const saveTodo = await newTodo.save();

        return res.status(201).json({
            success: true,
            message: "Todo created",
            data: saveTodo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};

export const fetchAllTodo = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        const allData = await todoModel.find({ user: loggedInUser });

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: allData
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};

export const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        const todoIsAvailable = await todoModel.findById(id);

        if (!todoIsAvailable) {
            return res.status(200).json({
                success: false,
                message: "Bad request",
            });
        };

        if (todoIsAvailable.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only update your own todo"
            });
        };

        const modifiedTodo = await todoModel.findByIdAndUpdate(
            id,
            { isCompleted: !todoIsAvailable.isCompleted },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Todo update successfully",
            data: modifiedTodo
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};

export const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };

        const loggedInUser = req.user._id;

        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                
            })
        }

        const todoExist = await todoModel.findById(id);

        if (!todoExist) {
            return res.status(400).json({
                success: false,
                message: "Todo not exist"
            });
        };

        if (todoExist.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete your own todo"
            });
        };

        if (!todoExist.isCompleted) {
            return res.status(400).json({
                success: false,
                message: "Complete your todo first then it should be deleted"
            });
        };

        await todoModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    };
};
