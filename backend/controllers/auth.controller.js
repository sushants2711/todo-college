import { setCookiesAndToken } from "../middleware/jwt.cookie.token.js";
import user from "../model/auth.model.js";
import bcrypt from "bcryptjs";



export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        };

        const userExist = await user.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is already exist"
            });
        };

        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        const createNewUser = new user({
            name,
            email,
            password: hash_password
        });

        await createNewUser.save();

        setCookiesAndToken(createNewUser._id, res);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            name: name,
            email: email
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await user.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User is not exist"
            });
        };

        const compare_password = await bcrypt.compare(password, userExist.password);

        if (!compare_password) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        };

        setCookiesAndToken(userExist._id, res);

        return res.status(200).json({
            success: true,
            message: "Logged In Successfull",
            name: userExist.name,
            email: userExist.email
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

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
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