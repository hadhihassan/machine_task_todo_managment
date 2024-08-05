import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import mongoose from 'mongoose'
import { StatusCodes } from "http-status-codes";

export async function verifyUser(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token not provided" });
        }

        const decodedToken = jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        const userData = await User.findById(objectId);
        if (!userData) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        req.userId = userData._id;
        next();

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}