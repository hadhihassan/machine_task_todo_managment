import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Todo from '../../models/todoModel.js';
import Project from '../../models/projectModel.js';



export const editProject = asyncErrorHandler(async (req, res) => {

    const { title, description, _id } = req.body;
    const isExisting = await Project.findOne({ title });
    if (isExisting && _id != isExisting._id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Project already exisiting!"
        })
    }

    const updateProject = await Project.findByIdAndUpdate(_id, {
        title,
        description: description,
    }, { new: true })
    if (!updateProject) {
        throw new Error("Project update failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully project updated."
    })
})

export const editTask = asyncErrorHandler(async (req, res) => {

    const { _id, description, status } = req.body;
    const isExisting = await Todo.find({ description });
    if (isExisting.length > 1) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Task already exisiting!"
        })
    }

    const updateTask = await Todo.findByIdAndUpdate(
        _id,
        { status, description },
        { new: true }
    );

    if (!updateTask) {
        throw new Error("Task update failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully Task updated."
    })
})

export const updateTaskStatus = asyncErrorHandler(async (req, res) => {

    const { _id } = req.body;
    

    const updateTask = await Todo.findByIdAndUpdate(
        _id,
        { status : "Completed" },
        { new: true }
    );

    if (!updateTask) {
        throw new Error("Task update failed")
    }

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully Task updated."
    })
})