import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Todo from '../../models/todoModel.js';
import Project from '../../models/projectModel.js';


export const createNewProject = asyncErrorHandler(async () => {
    const { id } = req.body;

    const Project = await Project.findById(id);
    if (!Project) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: "Project note found!"
        })
    }

    const deleteTodos = Project.todos.forEach(async (todoId) => {
        await Todo.findByIdAndDelete(todoId);
    });
    await Promise.all(deleteTodos);

    const deletedProject = await Project.findByIdAndDelete(id)
    if (!deletedProject) {
        throw new Error("Project deletion failed")
    }

    return res.status(StatusCodes.NO_CONTENT).json({
        success: true,
        message: "Successfully project removed."
    })
})