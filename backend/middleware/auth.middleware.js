import joi from "joi";

// Signup middleware
export const signupMiddleware = async (req, res, next) => {
    try {
        // create a schema of object using joi validation
        const schema = joi.object({
            name: joi.string().min(2).max(50).required(),
            email: joi.string().email().min(10).max(50).trim().required(),
            password: joi.string().min(8).max(1024).required(),
            confirmPassword: joi.string().min(8).max(1024).required(),
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
            message: "Internal server error",
            error: error.message
        });
    };
};

// login middleware
export const loginMiddleware = async (req, res, next) => {
    try {
        // create a schema of object using joi validation
        const schema = joi.object({
            email: joi.string().email().min(10).max(50).trim().required(),
            password: joi.string().min(8).max(30).required(),
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

// deleteUser Account middleware
export const deleteUserAccountMiddleware = async (req, res, next) => {
    try {
        // create a schema of object using joi validation
        const schema = joi.object({
            name: joi.string().min(2).max(50).required(),
            email: joi.string().email().min(10).max(50).trim().required(),
            password: joi.string().min(8).max(1024).required(),
        });

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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        })
    }
}