import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import User from '../../models/userModel.js'
import VerificationCode from '../../models/verfication-code-model.js'



export const verifyUser = asyncErrorHandler(async (req, res) => {

    const { code } = req.body;

    const isExisiting = await VerificationCode.findOne({ code })
    if (!isExisiting)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: "Wrong code, Try again.",
            message: true
        })

    const updateUser = await User.findByIdAndUpdate(isExisiting.user, {
        isVerified : true
    })
    if(!updateUser){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Account verification failed."
        })
    }

    return res.status(StatusCodes.ACCEPTED).json({
        success : true,
        message: "Account verifications successfull."
    })
})