import * as Yup from 'yup';

export const projectSchema = Yup.object({
    title: Yup.string()
        .trim()
        .strict('Invalid title')
        .required('Name is required')
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at less than 100 characters"),
    description: Yup.string()
        .trim()
        .strict('Invalid description')
        .required('description is required')
        .min(3, "description must be at least 3 characters")
        .max(100, "description must be at less than 100 characters"),
    todo: Yup.string()
        .trim()
        .strict('Invalid task')
        .min(3, "Task must be at least 3 characters")
        .max(100, "Task must be at less than 100 characters"),
    todos: Yup.array()
        .of(Yup.string())
        .min(3, 'At least 3 task are required')
        .max(20, 'No more than 20 tasks allowed'),
})
export const todoSchema = Yup.object({
    todo: Yup.string()
        .trim()
        .strict('Invalid Task')
        .required('Task is required')
        .min(3, "Task must be at least 3 characters")
        .max(20, "Task must be at less than 20 characters"),
})