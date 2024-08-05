import Project from '../../models/projectModel.js';
import { gitTemplate } from '../../template/gistTemplate.js'


export const exportGitFile = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate("todos")
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const markdownContent = gitTemplate(project);

        res.status(200).json({ success: true, message: "Project gist file exported", markdownContent });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}