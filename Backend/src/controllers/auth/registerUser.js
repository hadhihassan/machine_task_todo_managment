import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import { generateVerificationCode } from '../../util/codeGenerator.js';
import { sendMail } from '../../util/sendMails.js';
import User from '../../models/userModel.js';
import VerificationCode from '../../models/verfication-code-model.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; 

export const registerUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    const isExisting = await User.findOne({ email });
    if (isExisting) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Email already exists.",
        });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInput = { ...req.body, password: hashedPassword };
    const user = await User.create(userInput);

    const code = generateVerificationCode();
    await VerificationCode.create({
        user: user._id,
        code,
    });

    await sendMail({
        email: user.email,
        message: `Your verification code is ${code}`,
        subject: "Verification Code for your account",
    });

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Verification mail sent.",
    });
});
