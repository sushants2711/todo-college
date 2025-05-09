import { setCookiesAndToken } from "../middleware/jwt.cookie.token.js";
import user from "../model/auth.model.js";
import bcrypt from "bcryptjs";


// Logic for signup controller
export const signup = async (req, res) => {
    try {
        // take all the request from body
        const { name, email, password, confirmPassword } = req.body;

        // check password is equal to confirm password or not
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        };

        // Check user exist or not
        const userExist = await user.findOne({ email });

        // If user is already exist then
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is already exist"
            });
        };

        // hashing the password
        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        // create a new user in our database
        const createNewUser = new user({
            name,
            email,
            password: hash_password
        });

        // save the user in our database
        await createNewUser.save();

        // send a cookie with some parameters
        setCookiesAndToken(createNewUser._id, res);

        // return the status code etc
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

// Login controller logic 
export const login = async (req, res) => {
    try {
        // take all the request from body
        const { email, password } = req.body;

        // check user is exist or not
        const userExist = await user.findOne({ email });

        // If user is not exist than
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User is not exist"
            });
        };

        // if user is exist than compare the password with the help of bcrypt.compare
        const compare_password = await bcrypt.compare(password, userExist.password);

        // if comapre password is wrong and not match the user password than return
        if (!compare_password) {
            return res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        };

        // send a cookies 
        setCookiesAndToken(userExist._id, res);

        // return the status code and some other information
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

// logout controller function 
export const logout = async (req, res) => {
    try {
        // clear the cookie
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

// delete user account controller
export const deleteUserAccount = async (req, res) => {
    try {
        // take all the request from body
        const { name, email, password } = req.body;

        // find logged in user
        const loggedInUser = req.user._id;

        // if not find logged in user than 
        if (!loggedInUser) {
            return res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
        };

        // find the user on the basis of their email 
        const userExist = await user.findOne({ email });

        // If user is not exist than
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User is not exist"
            });
        };

        // If user is exist than compare their Id to logged In user Id
        if (userExist._id.toString() !== loggedInUser.toString()) {
            return res.status(403).json({
                success: false,
                message: "You should only delete their own account"
            });
        };

        // Check the password with the help of bcryptjs
        const checkPassword = await bcrypt.compare(password, userExist.password)

        // If name , email, password must be equal to user that exist in our database
        if (name !== userExist.name || email !== userExist.email || !checkPassword) {
            return res.status(400).json({
                success: false,
                message: "All field are not matching"
            });
        };

        // delete the user from database
        await user.findByIdAndDelete(userExist._id);

        // clear the cookie
        res.clearCookie("jwt");

        // return the status code etc
        return res.status(200).json({
            success: true,
            message: "User account delete successfull"
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