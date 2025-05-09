import joi from "joi";

export const createTodoMiddleware = async (req, res, next) => {
    try {
        // create a schema of object using joi validation
        const schema = joi.object({
            text: joi.string().min(2).max(200).required()
        });

        // if error occured from body so we should validate 
        const { error } = schema.validate(req.body);

        // If error occured in data validation
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.details[0].message
            });
        };

        // next function should be call
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};