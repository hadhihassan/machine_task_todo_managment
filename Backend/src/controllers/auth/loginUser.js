import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import User from '../../models/userModel.js'
import { generateJwtToken } from "../../util/jwtToken.js";
import bcrypt from 'bcrypt'

export const loginUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const logedUser = await User.findOne({ email })
    if (!logedUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid crendential.",
        });
    }
    const comparePassword = await bcrypt.compare(password, logedUser.password);
    if (!comparePassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Wrong password.",
        });
    }

    if (!logedUSer.isVerified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Youre not verified, please verify.",
        });
    }

    let token = await generateJwtToken(logedUser._id);
    return res.status(StatusCodes.ACCEPTED).json({
        success: true,
        message: "Loging Successfull",
        token
    })
});