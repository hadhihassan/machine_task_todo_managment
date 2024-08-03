import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";
import User from "../models/user-model.js";
import mongoose from 'mongoose'

export async function verifyUser(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }

        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        console.log("JWT Token", decodedToken, token.slice(7))
        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        const userData = await User.findById(objectId);
        if (!userData) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        if (userData.isBlock) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Sorry your blocked",
                isBlocked: true
            });
        }

        req.userId = userData._id;
        next();

    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}