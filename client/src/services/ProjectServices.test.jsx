import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import axios from './Axios';
import {
    createNewProject,
    getProjects,
    editProject,
    deleteProject,
    editTask,
    deleteTask,
    updateTaskStatus,
    exportGist,
    addNewTod
} from './ProjectService';



jest.mock('./Axios');
describe('API Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call axios.post with correct URL and data for createNewProject', async () => {
        const mockResponse = { data: 'project created' };
        axios.post.mockResolvedValue(mockResponse);

        const projectData = { name: 'New Project' };
        const response = await createNewProject(projectData);

        expect(axios.post).toHaveBeenCalledWith('/project/create', projectData, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.get with correct URL for getProjects', async () => {
        const mockResponse = { data: ['project1', 'project2'] };
        axios.get.mockResolvedValue(mockResponse);

        const response = await getProjects();

        expect(axios.get).toHaveBeenCalledWith('/project/', { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.patch with correct URL and data for editProject', async () => {
        const mockResponse = { data: 'project edited' };
        axios.patch.mockResolvedValue(mockResponse);

        const projectData = { id: 1, name: 'Updated Project' };
        const response = await editProject(projectData);

        expect(axios.patch).toHaveBeenCalledWith('/project/edit-project', projectData, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.delete with correct URL and data for deleteProject', async () => {
        const mockResponse = { data: 'project deleted' };
        axios.delete.mockResolvedValue(mockResponse);

        const projectId = 1;
        const response = await deleteProject(projectId);

        expect(axios.delete).toHaveBeenCalledWith('/project/delete-project', {
            data: { projectId }, 
            withCredentials: true
        });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.patch with correct URL and data for editTask', async () => {
        const mockResponse = { data: 'task edited' };
        axios.patch.mockResolvedValue(mockResponse);

        const projectData = { taskId: 1, description: 'Updated Task' };
        const response = await editTask(projectData);

        expect(axios.patch).toHaveBeenCalledWith('/project/edit-task', projectData, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.patch with correct URL and data for deleteTask', async () => {
        const mockResponse = { data: 'task deleted' };
        axios.patch.mockResolvedValue(mockResponse);

        const _id = 1;
        const response = await deleteTask(_id);

        expect(axios.patch).toHaveBeenCalledWith('/project/delete-task', { _id }, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.patch with correct URL and data for updateTaskStatus', async () => {
        const mockResponse = { data: 'task status updated' };
        axios.patch.mockResolvedValue(mockResponse);

        const projectId = 1;
        const response = await updateTaskStatus(projectId);

        expect(axios.patch).toHaveBeenCalledWith('/project/update-task-status', { _id: projectId }, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.post with correct URL and data for exportGist', async () => {
        const mockResponse = { data: 'gist exported' };
        axios.post.mockResolvedValue(mockResponse);

        const projectId = 1;
        const response = await exportGist(projectId);

        expect(axios.post).toHaveBeenCalledWith(`/project/${projectId}/export`, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });

    it('should call axios.post with correct URL and data for addNewTod', async () => {
        const mockResponse = { data: 'task added' };
        axios.post.mockResolvedValue(mockResponse);

        const projectId = 1;
        const task = { description: 'New Task' };
        const response = await addNewTod(projectId, task);

        expect(axios.post).toHaveBeenCalledWith('/project/add-new-task', { projectId, task }, { withCredentials: true });
        expect(response).toEqual(mockResponse);
    });
});
