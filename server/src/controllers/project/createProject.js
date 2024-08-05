import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Todo from '../../models/todoModel.js';
import Project from '../../models/projectModel.js';


export const createNewProject = asyncErrorHandler(async (req, res) => {
    const { title, description, todos } = req.body;
    const { userId } = req;

    const isExisting = await Project.findOne({ title });
    if (isExisting) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Project already exisiting!"
        })
    }

    const todosIdPromises = todos.map(todo => Todo.create({ description: todo }));
    const todosIds = await Promise.all(todosIdPromises);

    const saveProject = await Project.create({
        title,
        description,
        todos: todosIds,
        user: userId
    })

    if (!saveProject) {
        throw new Error("Project create failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully project initiated."
    })
})

export const addNewTask = asyncErrorHandler(async (req, res) => {
    const { projectId, task } = req.body;

    const isExisting = await Todo.findOne({ description: task })
    if (isExisting) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Task is already exisiting!"
        })
    }
    const project = await Project.findById(projectId)
    if (isExisting && project.todos.includes(isExisting._id) && isExisting) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Task is already exisint"
        })
    }
    const newTask = await Todo.create({ description: task })
    project.todos.push(newTask._id)
    await project.save()

    if (!newTask) {
        throw new Error("Task create failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully new task created."
    })
})

