import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Todo from '../../models/todoModel.js';
import Project from '../../models/projectModel.js';


export const createNewProject = asyncErrorHandler(async () => {
    const { title, description, todos } = req.body;

    const isExisting = await Todo.findOne({ title });
    if (isExisting) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Project already exisiting!"
        })
    }

    const todosId = todos.map(async (todo) => {
        const saveTodo = await Todo.create({
            description: todo,
        })
        return saveTodo._id
    })

    const saveProject = await Project.create({
        title,
        description,
        todos: todosId
    })

    if (!saveProject) {
        throw new Error("Project create failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully project initiated."
    })
})