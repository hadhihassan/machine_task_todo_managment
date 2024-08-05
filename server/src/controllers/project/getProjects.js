import { StatusCodes } from "http-status-codes";
import { asyncErrorHandler } from "../../util/asyncHandler.js";
import Project from '../../models/projectModel.js';


export const getProjects = asyncErrorHandler(async (req, res) => {
    const { userId } = req;

    const projects = await Project.find({ user: userId }).populate('user').populate('todos');
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully project initiated.",
        projects
    })
})