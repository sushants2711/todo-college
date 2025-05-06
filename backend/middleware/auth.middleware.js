import joi from "joi";

export const signupMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            name: joi.string().min(2).max(50).required(),
            email: joi.string().email().min(10).max(50).trim().required(),
            password: joi.string().min(8).max(1024).required(),
            confirmPassword: joi.string().min(8).max(1024).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
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
            message: "Internal server error",
            error: error.message
        });
    };
};

export const loginMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().email().min(10).max(50).trim().required(),
            password: joi.string().min(8).max(30).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
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