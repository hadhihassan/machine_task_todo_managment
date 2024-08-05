import { useState, useEffect } from 'react';
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import { editProject, editTask, deleteTask, updateTaskStatus, exportGist, addNewTod } from '../services/ProjectService'
import { downloadMarkdown } from '../utils/DownloadGitFile';
import { calculateCompletedTask } from '../utils/CalculateCompletedTask';
import moment from 'moment'


export default function ProjectCard(props) {
    const [projectData, setData] = useState(props.project)
    const [newTask, setNewTask] = useState(null)
    const [openNewTaskInput, setopenNewTaskInput] = useState(false)
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
            const response = await updateTaskStatus(props.project.todos[index]._id)
            props.update()
            if (!response.data.success) {
                return toast.error(response.message)
            }
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.data.errors) {
                return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
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
            const response = await editProject(props.project)
            if (!response.data.success) {
                return toast.error(response.message)
            }
            setTitleEditing(prev => !prev)
            props.update()
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.data.errors) {
                return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
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
            const response = await editTask(props.project.todos[index])
            if (!response.data.success) {
                return toast.error(response.data?.message || "Somthing wen wrong")
            }
            props.update()
            setTaskEditing(prevState => ({ ...prevState, [index]: false }));
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.data.errors) {
                return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
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
            const response = await deleteTask(props.project.todos[index]._id)
            if (!response.data.success) {
                return toast.error(response.data?.message || "Somthing wen wrong")
            }
            setTaskEditing(prevState => ({ ...prevState, [index]: false }));
            props.update()
            return toast.success(response.data.message)
        } catch (error) {
            if (error.response.data.errors) {
                return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project remove failed!";
            if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    }
    const downloadProjectGist = async () => {
        const data = await exportGist(props.project._id)
        downloadMarkdown(data.data.markdownContent, props.project.title)
    }
    const handleAddNewTask = async () => {
        try {
            const response = await addNewTod(props.project._id, newTask)
            if (!response.data.success) {
                return toast.error(response.data?.message || "Somthing wen wrong")
            }
            props.update()
            setopenNewTaskInput((prev) => !prev)
            return toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            if (error.response.data.errors) {
                return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
            }
            let errorMessage = "Project remove failed!";
            if (error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            return toast.error(errorMessage || 'Internal Server error')
        }
    }
    useEffect(() => {
        setData(props.project)
        setNumber(calculateCompletedTask(props.project.todos))
        props.update()
        console.log("changing") 
    }, [])

    return (<>
        <div className="border p-5 rounded-lg border-violet-900 hover:border-violet-500 max-w-[300px] max-h-[100p]">
            <p className="font-sans font-semibold py-5 ">
                {props.project?.title}
            </p>
            <p className="text-xs break-words font-light text-slate-200 h-16">
                {props.project?.description}
            </p>
            <p className="text-sm my-5">
                <span className="text-violet-400">Summary</span> : {numOfCompletd} / {props.project?.todos?.length} todos completed
            </p>
            <button className="w-full border my-3 bg-violet-700" onClick={downloadProjectGist}>Export as gist</button>
            <button className="w-full border bg-violet-700" onClick={onClose}>Details</button>
        </div >
        <Modal isOpen={open} onClose={onClose}>
            <div className="rounded-lg border-violet-900 hover:border-violet-800 p-5">
                <div className="flex mb-4">
                    {
                        isTitleEditing ? (
                            <input
                                type="text"
                                name="title"
                                className={`rounded-md border p-2  focus:outline-none bg-transparent w-full  font-sans font-semibold py-3 text-black text-2xl`}
                                value={props.project?.title}
                                onChange={(e) => updateProjectState(e.target)}
                                autoFocus
                            />
                        ) : (
                            <p className=' font-sans font-semibold py-3 text-black text-2xl w-full'>
                                {props.project?.title}
                            </p>
                        )
                    }
                    <button
                        className='text-xs font-sans font-semibold   bg-violet-600'
                        onClick={() => isTitleEditing ? updateProject() : setTitleEditing(prev => !prev)}
                    >
                        {isTitleEditing ? "Save" : "Edit"}
                    </button>
                </div>

                <div>
                    {
                        isTitleEditing ? (
                            <textarea
                                name="description"
                                className={`rounded-md border p-2 focus:outline-none bg-transparent w-full col-span-6 font-sans py-5 text-black text-xs`}
                                onChange={(e) => updateProjectState(e.target)}
                                autoFocus
                            >{props.project?.description}</textarea>
                        ) : (
                            <p className="text-xs break-words text-black mb-4 col-span-6 font-sans">
                                <u>Description</u> : {props.project?.description}
                            </p>
                        )
                    }
                </div>
                <div>
                    <p className="text-sm my-5 text-black">
                        <span className="text-violet-950">Summary</span> : {numOfCompletd} / {props.project?.todos?.length} todos completed
                    </p>
                </div>
                <p className="break-words font-semibold text-black mb-2 text-md" onClick={() => setopenNewTaskInput((prev) => !prev)}>
                    Task
                    <span className=' ml-2 mb-2 text-xs font-sans font-semibold text-white border px-2 py-0.5 rounded-full bg-violet-600'>Add task</span>

                </p>
                {
                    openNewTaskInput && <div className='flex'>
                        <input
                            id="description"
                            name="description"
                            type="description"
                            onChange={(e) => setNewTask(e.target.value)}
                            className={`w-full px-2  py-2 border rounded-md p-2 focus:outline-none bg-transparent text-black border-gray-300
                            }`}
                        />
                        <button className='bg-violet-600' onClick={handleAddNewTask}>Add</button>
                    </div>
                }
                {
                    props.project?.todos?.map((todo, index) => (
                        <div key={index} className='flex items-center justify-between w-auto py-1'>
                            <div className={`flex border w-full p-3 bg-violet-700 rounded-lg `}>
                                <div className="flex gap-4 w-full text-start  justify-start items-center">
                                    {index + 1}
                                    {isTaskEditing[index] ? (
                                        <input
                                            type="text"
                                            className="rounded-md focus:outline-none bg-transparent"
                                            value={todo.description}
                                            onChange={(e) => updateTaskState(index, e.target.value)}
                                            autoFocus
                                        />
                                    ) : (<>
                                        <div className='w-auto grid grid-cols-1'>
                                            <p className='font-sans text-sm flex gap-1 m-1'>{todo.description}
                                                <p className={`text-xs font-sans font-semibold border ${todo.status === "Completed" ? "bg-green-600" : "bg-red-600"} rounded-full px-1`}>{todo.status}</p>
                                            </p>
                                            <p className='text-xs text-green-500 font-sans m-1 font-semibold'>{moment(todo.createdAt).format("MMM Do YY")}</p>
                                        </div>
                                    </>
                                    )}
                                </div>
                                <div className={`flex gap-1 `}>
                                    <button
                                        onClick={() => removeTask(index)}
                                        type="button"
                                        className="font-bold text-xs bg-violet-600"
                                    >
                                        remove
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => isTaskEditing[index] ? updateTask(index) : editTodo(index)}
                                        className="font-bold text-xs bg-violet-600"
                                    >
                                        {isTaskEditing[index] ? "Save" : "Edit"}
                                    </button>
                                    {
                                        (todo.status === "Pending" || todo.status === "pending") && (
                                            <button
                                                type="button"
                                                onClick={() => taskStatusUpdate(index)}
                                                className="font-bold text-xs bg-violet-600"
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
        </Modal >
    </>
    )
} 