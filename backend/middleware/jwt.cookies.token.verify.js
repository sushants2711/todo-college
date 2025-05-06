import jwt from "jsonwebtoken";
import User from "../model/auth.model.js"

export const ensureAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(403).json({ success: false, message: "Unauthorized - No Token Provided" });
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ success: false, message: "Jwt - Authorization failed" });
        };

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        };

        req.user = user;

        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    };
};