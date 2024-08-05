import { useState, useEffect } from 'react';
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import { editProject, editTask, deleteTask, updateTaskStatus, exportGist } from '../services/ProjectService'
import { downloadMarkdown } from '../utils/DownloadGitFile';
import { calculateCompletedTask } from '../utils/CalculateCompletedTask';


export default function ProjectCard({ project }) {

    const [projectData, setData] = useState(null)
    const [numOfCompletd, setNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [isTitleEditing, setTitleEditing] = useState(false)
    const [isTaskEditing, setTaskEditing] = useState({})

    const onClose = () => setOpen(!open)

    const editTodo = (index) => {
        setTaskEditing(prevState => ({ ...prevState, [index]: true }));
    }
    const updateProjectState = (e) => {
        const { name, value } = e;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const updateTaskState = (index, newValue) => {
        const isDuplicate = projectData.todos.some(todo => todo.description === newValue);

        if (isDuplicate) {
            toast.error('Duplicate value detected. No update performed.');
            return
        }

        setData(prev => ({
            ...prev,
            todos: prev.todos.map((todo, idx) =>
                idx === index ? { ...todo, description: newValue } : todo
            )
        }));
    }

    const taskStatusUpdate = async (index) => {
        try {
            console.log(projectData.todos[index]._id)
            const response = await updateTaskStatus(projectData.todos[index]._id)
            console.log(response)
            if (!response.data.success) {
                return toast.error(response.message)
            }
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.errors) {
                return toast.error(error.response.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project update failed!";
            if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    };

    const updateProject = async () => {
        try {
            const response = await editProject(projectData)
            if (!response.data.success) {
                return toast.error(response.message)
            }
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.errors) {
                return toast.error(error.response.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project update failed!";
            if (error.response.response.message) {
                errorMessage = error.response.response.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    }
    const updateTask = async (index) => {
        try {
            const response = await editTask(projectData.todos[index])
            if (!response.data.success) {
                return toast.error(response.data?.message || "Somthing wen wrong")
            }
            setTaskEditing(prevState => ({ ...prevState, [index]: false }));
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.errors) {
                return toast.error(error.response.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project update failed!";
            if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    }
    const removeTask = async (index) => {
        try {
            const response = await deleteTask(projectData.todos[index]._id)
            if (!response.data.success) {
                return toast.error(response.data?.message || "Somthing wen wrong")
            }
            setTaskEditing(prevState => ({ ...prevState, [index]: false }));
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.errors) {
                return toast.error(error.response.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project remove failed!";
            if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    }
    const exportt = async () => {
        const data = await exportGist(projectData._id)
        downloadMarkdown(data.data.markdownContent, projectData.title)
    }
    useEffect(() => {
        setData(project)
        setNumber(calculateCompletedTask(project.todos))
    }, [])

    return (<>
        <div className="border p-5 rounded-lg border-violet-900 hover:border-violet-500 max-w-[300px] max-h-[100p]">
            <p className="font-sans font-semibold py-5 ">
                {projectData?.title}
            </p>
            <p className="text-xs break-words font-light text-slate-200">
                {projectData?.description}
            </p>
            <p className="text-sm my-5">
                <span className="text-violet-400">Summary</span> : {numOfCompletd} / {projectData?.todos?.length} todos completed
            </p>
            <button className="w-full border my-3 bg-violet-700" onClick={exportt}>Export</button>
            <button className="w-full border bg-violet-700" onClick={onClose}>Details</button>
        </div >
        <Modal isOpen={open} onClose={onClose}>
            <div className="border rounded-lg border-violet-900 hover:border-violet-800 p-3 h-full ">
                <div className="grid grid-cols-4">
                    {
                        isTitleEditing ? (
                            <input
                                type="text"
                                name="title"
                                className={`rounded-md ${isTitleEditing && "border border-violet-500"} focus:outline-none bg-transparent w-full col-span-3 font-sans font-semibold py-5 text-black text-2xl`}
                                value={projectData?.title}
                                onChange={(e) => updateProjectState(e.target)}
                                autoFocus
                            />
                        ) : (
                            <p className='col-span-3 font-sans font-semibold py-5 text-black text-2xl w-auto'>
                                {projectData?.title}
                            </p>
                        )
                    }
                    <button
                        className='col-span-1 text-xs font-sans font-semibold text-black w-auto text-start'
                        onClick={() => isTitleEditing ? updateProject() : setTitleEditing(prev => !prev)}
                    >
                        {isTitleEditing ? "Save" : "Edit"}
                    </button>
                </div>
                <div className="grid grid-cols-6">
                    {
                        isTitleEditing ? (
                            <textarea
                                name="description"
                                className={`rounded-md ${isTitleEditing && "border border-violet-500"} focus:outline-none bg-transparent w-full col-span-6 font-sans py-5 text-black text-xs`}
                                onChange={(e) => updateProjectState(e.target)}
                                autoFocus
                            >{projectData?.description}</textarea>
                        ) : (
                            <p className="text-xs break-words text-black mb-4 col-span-6 font-sans">
                                <u>Description</u> : {projectData?.description}
                            </p>
                        )
                    }
                </div>
                <p className="break-words font-semibold text-black mb-2 text-md">
                    Task
                </p>
                {
                    projectData?.todos?.map((todo, index) => (
                        <div key={index} className='flex items-center justify-between w-auto py-1'>
                            <div className={`flex justify-start mx-2 items-center ${isTaskEditing[index] ? "" : "gap-20"}`}>
                                <div className="flex gap-4 w-[50%] h-full text-start  justify-start items-center text-black">
                                    {index + 1}
                                    {isTaskEditing[index] ? (
                                        <input
                                            type="text"
                                            className="rounded-md focus:outline-none bg-transparent text-black"
                                            value={todo.description}
                                            onChange={(e) => updateTaskState(index, e.target.value)}
                                            autoFocus
                                        />
                                    ) : (
                                        <p className='text-gray-700 font-sans text-sm'>{todo.description}</p>
                                    )}
                                </div>
                                <div className={`flex  w-[50%] items-center gap-1 ${!isTaskEditing[index] && "mr-5"}`}>
                                    <button
                                        onClick={() => removeTask(index)}
                                        type="button"
                                        className="text-violet-600 hover:text-violet-700 font-bold text-xs text-center"
                                    >
                                        remove
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => isTaskEditing[index] ? updateTask(index) : editTodo(index)}
                                        className="text-violet-600 hover:text-violet-700 font-bold text-xs text-center"
                                    >
                                        {isTaskEditing[index] ? "Save" : "Edit"}
                                    </button>
                                    {
                                        (todo.status === "Pending" || todo.status === "pending") && (
                                            <button
                                                type="button"
                                                onClick={() => taskStatusUpdate(index)}
                                                className="text-violet-600 w-[20%] hover:text-violet-700 font-bold text-xs text-center"
                                            >
                                                update
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Modal>
    </>
    )
} 