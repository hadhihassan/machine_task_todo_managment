import express from 'express';
import { newTaskSchema, projectIdSchema, projectSchema, taskIdSchema, taskSchema } from '../dtos/projectDto.js'
import { validateHandler } from '../middlewares/validateHandler.js'
import { verifyUser } from '../middlewares/verifyUser.js'
import { getProjects } from '../controllers/project/getProjects.js'
import { createNewProject, addNewTask } from '../controllers/project/createProject.js'
import { deletedProject, deletedTask } from '../controllers/project/deleteProject.js'
import { editProject, editTask, updateTaskStatus } from '../controllers/project/editProject.js'
import { exportGitFile } from '../controllers/project/expeortGist.js'



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
    "/edit-project",
    verifyUser,
    projectSchema,
    projectIdSchema,
    validateHandler,
    (req, res, next) => {
        editProject(req, res, next)
    }
)
router.patch(
    "/edit-task",
    verifyUser,
    taskSchema,
    taskIdSchema,
    validateHandler,
    (req, res, next) => {
        editTask(req, res, next)
    }
)
router.patch(
    "/update-task-status",
    verifyUser,
    taskIdSchema,
    validateHandler,
    (req, res, next) => {
        updateTaskStatus(req, res, next)
    }
)
router.patch(
    "/delete-task",
    verifyUser,
    taskIdSchema,
    validateHandler,
    (req, res, next) => {
        deletedTask(req, res, next)
    }
)
router.delete(
    "/delete-project",
    verifyUser,
    projectIdSchema,
    validateHandler,
    (req, res, next) => {
        deletedProject(req, res, next)
    }
)
router.post(
    '/:id/export',
    verifyUser,
    (req, res, next) => {
        exportGitFile(req, res)
    }
);
router.post(
    '/add-new-task',
    verifyUser,
    newTaskSchema,
    validateHandler,
    (req, res, next) => {
        addNewTask(req, res)
    }
);


export default router