import todoModel from "../model/todo.model.js";

// create todo logic for controller
export const createTodo = async (req, res) => {
    try {
        // take the request from body
        const { text } = req.body;

        // If user is find with the help of cookies
        if (!req.user) {
            return res.status(400).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        // check logged in user
        const loggedInUser = req.user._id;

        // if user is find than create a new instance in our database
        const newTodo = new todoModel({
            text,
            user: loggedInUser
        });

        // save the data in our database
        const saveTodo = await newTodo.save();

        // return a status code and other logic
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

// fetch only logged In user todo
export const fetchAllTodo = async (req, res) => {
    try {
        // find a logged in user
        const loggedInUser = req.user._id;

        // if not logged in user find than 
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        // find all todo of logged in user
        const allData = await todoModel.find({ user: loggedInUser });

        // return a some status code 
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

// update todo controller logic
export const updateTodo = async (req, res) => {
    try {
        // take the id from req.params
        const id = req.params.id;

        // If id is not find than 
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };

        // fethc the logged in user with the help of cookies
        const loggedInUser = req.user._id;

        // If not find logged in user than 
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        // check todo is available or not in our database
        const todoIsAvailable = await todoModel.findById(id);

        // If todo is not available than
        if (!todoIsAvailable) {
            return res.status(200).json({
                success: false,
                message: "Bad request",
            });
        };

        // check tthe todo availbale and logged in user id is same 
        if (todoIsAvailable.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only update your own todo"
            });
        };

        // update the todo if it is true than to false and false to true viceversa
        const modifiedTodo = await todoModel.findByIdAndUpdate(
            id,
            { isCompleted: !todoIsAvailable.isCompleted },
            { new: true }
        );

        // return a status code 
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

// delete todo controller logic
export const deleteTodo = async (req, res) => {
    try {
        // take the id from req.params
        const id = req.params.id;

         // If id is not find than 
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is missing"
            });
        };

        // fethc the logged in user with the help of cookies
        const loggedInUser = req.user._id;

         // If not find logged in user than 
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                
            })
        }

        // check todo is available or not in our database
        const todoExist = await todoModel.findById(id);

        // If todo is not exist than
        if (!todoExist) {
            return res.status(400).json({
                success: false,
                message: "Todo not exist"
            });
        };

         // check tthe todo availbale and logged in user id is same 
        if (todoExist.user.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete your own todo"
            });
        };

        // If todo is not completed than 
        if (!todoExist.isCompleted) {
            return res.status(400).json({
                success: false,
                message: "Complete your todo first then it should be deleted"
            });
        };

        // delete the todo from our database
        await todoModel.findByIdAndDelete(id);

        // return a logic 
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
