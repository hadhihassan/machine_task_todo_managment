import express from 'express';
import { projectIdSchema, projectSchema } from '../dtos/projectDto.js'
import { validateHandler } from '../middlewares/validateHandler.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { getProjects } from '../controllers/project/getProjects.js'

export const router = express.Router()


router.get(
    "/",
    verifyUser,
    (req, res, next) => {
        getProjects(req, res)
    }
)
router.post(
    "/create",
    verifyUser,
    projectSchema,
    validateHandler,
    (req, res, next) => {
        createNewProject(req, res)
    }
)
router.patch(
    "/edit",
    verifyUser,
    projectSchema,
    projectIdSchema,
    validateHandler,
    (req, res, next) => {
    }
)
router.delete(
    "/delete",
    verifyUser,
    projectIdSchema,
    validateHandler,
    (req, res, next) => {

    }
)

export default router