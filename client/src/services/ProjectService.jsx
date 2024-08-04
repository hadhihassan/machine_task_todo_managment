import axios from "./Axios";

export async function createNewProject(projectData) {
    return await axios.post("/project/create",  projectData, {
        withCredentials : true
    })
}

export async function editProject(projectData) {
    return await axios.patch("/project/edit",  projectData, {
        withCredentials : true
    })
}

export async function deleteProject(projectId) {
    return await axios.delete("/project/edit",  projectId, {
        withCredentials : true
    })
}

export async function getProjects() {
    return await axios.get("/project/", {
        withCredentials : true
    })
}