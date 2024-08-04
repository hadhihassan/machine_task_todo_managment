import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Todo from '../../models/todoModel.js';
import Project from '../../models/projectModel.js';


export const createNewProject = asyncErrorHandler(async (req, res) => {
    const { title, description, todos } = req.body;
    const { userId } = req;

    const isExisting = await Todo.findOne({ title });
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
        user : userId
    })
    
    if (!saveProject) {
        throw new Error("Project create failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully project initiated."
    })
})