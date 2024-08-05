import { body } from "express-validator";

export const projectSchema = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body("description")
        .trim()
        .notEmpty().withMessage("description is required")
        .isLength({ min: 10 }).withMessage('description must be at least 10 characters long'),
    body("todos")
        .trim()
        .notEmpty().withMessage("Taks is required")
        .isLength({ min: 3 }, { max: { max: 20 } }).withMessage("Task must be at least 3 task long")
        .isLength({ max: 20 }).withMessage("Task must less then 20 task.")
]

export const projectIdSchema = [
    body("_id")
        .exists()
]

export const taskSchema = [
    body("status")
        .trim()
        .notEmpty().withMessage("Title is required"),
    body("description")
        .trim()
        .notEmpty().withMessage("description is required")
        .isLength({ min: 3 }).withMessage('description must be at least 3 characters long'),
]

export const taskIdSchema = [
    body("_id")
        .exists()
]

export const newTaskSchema = [
    body("projectId")
        .trim()
        .notEmpty(),
    body("task")
        .trim()
        .notEmpty().withMessage("Task is required")
        .isLength({ min: 3 }).withMessage('Task must be at least 3 characters long'),
]