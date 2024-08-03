import mongoose, { Schema, model } from "mongoose";

const codeSchema = new Schema(
    {
        code: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            index: { expires: "5m" },
        },
    },
    {
        timestamps: true,
    }
);

const VerificationCode = model(
    "VerificationCode",
    codeSchema
);
export default VerificationCode;