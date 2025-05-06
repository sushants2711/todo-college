import jwt from "jsonwebtoken";

export const setCookiesAndToken = async (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,      // 30 days in millisecond
        httpOnly: true,           // prevent from XSS attacks cross-site scripting attacks
        sameSite: "strict",    // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
};