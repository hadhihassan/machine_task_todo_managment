import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import { generateVerificationCode } from '../../util/codeGenerator.js'
import { sendMail } from '../../util/sendMails.js'
import User from '../../models/userModel.js'
import VerificationCode from '../../models/verfication-code-model.js'


export const registerUser = asyncErrorHandler(async (req, res) => {

    const userInput = req.body;

    const isExisting = await User.findOne({ email : req.body.email })
    if (isExisting) {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Email alreadu Existing."
        })
    }

    const data = await User.create(userInput);
    const code = generateVerificationCode();
    await VerificationCode.create({
        user: data._id,
        code,
    });

    sendMail({
        email: data.email,
        message: `Your verification code is ${code}`,
        subject: "Verification Code for todo",
    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Verification mail send",
    });
});