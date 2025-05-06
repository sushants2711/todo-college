import joi from "joi";

export const createTodoMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            text: joi.string().min(2).max(200).required()
        });

        const { error } = schema.validate(req.body);

        if(error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message
            });
        };

        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};