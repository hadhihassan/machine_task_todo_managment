import jwt from "jsonwebtoken";
import { NotFoundError } from "../utils/errorTypes.js";
import { JWT_SECRET_KEY } from "../config/constants.js";
import User from "../models/user-model.js";


export async function verifyUser(req, res, next) {
    try {
        const tokenData = req.headers.authorization;
        if (!tokenData) throw new NotFoundError("Token not found");

        const decodedTokenData = jwt.verify(
            tokenData.split(" ")[1],
            JWT_SECRET_KEY
        );
        if (!decodedTokenData) new Error("Invalid token data");

        const user = await User.findOne({ _id: decodedTokenData.sub });
        if (!user) throw new NotFoundError("User not found");

        //@ts-ignore
        req.user = user ? user : undefined;

        next();
    } catch (error) {
        next(error);
    }
}