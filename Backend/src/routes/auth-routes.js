import express from 'express';
import { registerUser } from '../controllers/auth/register-user.js'
import { registerSchema, loginSchema, verificationSchema } from '../dtos/auth-dto.js'
import { validateHandler } from '../middlewares/validateHandler.js'

const router = express.Router();


// router.post(
//     "/login",
//     loginSchema,
//     validateHandler,
//     (req, res, next) => {
//         // loginUser(req, res, next);
//     }
// );

router.post(
    "/register",
    registerSchema,
    validateHandler,
    (req, res, next) => {
        console.log("am herer man \t", req.body)
        registerUser(req, res, next);
    }
);

// router.patch(
//     "/verify",
//     verificationSchema,
//     validateHandler,
//     (req, res, next) => {
//         // verifyUser(req, res, next);
//     }
// );
export default router;