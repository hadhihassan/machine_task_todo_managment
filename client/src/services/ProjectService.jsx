import axios from "./Axios";

export async function createNewProject(projectData) {
    return await axios.post("/project/create", projectData, {
        withCredentials: true
    })
}

export async function getProjects() {
    return await axios.get("/project/", {
        withCredentials: true
    })
}

export async function editProject(projectData) {
    return await axios.patch("/project/edit-project", projectData, {
        withCredentials: true
    })
}

export async function deleteProject(projectId) {
    return await axios.delete("/project/delete-project", projectId, {
        withCredentials: true
    })
}

export async function editTask(projectData) {
    return await axios.patch("/project/edit-task", projectData, {
        withCredentials: true
    })
}

export async function deleteTask(_id) {
    return await axios.patch("/project/delete-task", { _id }, {
        withCredentials: true
    })
}
export async function updateTaskStatus(projectId) {
    return await axios.patch("/project/update-task-status", { _id: projectId }, {
        withCredentials: true
    })
}
export async function exportGist(projectId) {
    return await axios.post(`/project/${projectId}/export`, {
        withCredentials: true
    })
}

