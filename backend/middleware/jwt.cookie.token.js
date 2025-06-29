import jwt from "jsonwebtoken";

// create a cookies for user verification
export const setCookiesAndToken = async (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    // send a cookie in a response and the cookie name in jwt
    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,      // 30 days in millisecond
        httpOnly: true,           // prevent from XSS attacks cross-site scripting attacks
        sameSite: "None",    // CSRF attacks cross-site request forgery attacks "strict" -- for development
        secure: true  // process.env.NODE_ENV !== "development"
    });

    return token;
};