import { useState, useEffect } from 'react';
import Modal from './Modal'



export default function ProjectCard({ project }) {

    const [numOfCompletd, setNumber] = useState(0)
    const [open, setOpen] = useState(false)

    const onClose = () => setOpen(!open)

    const calculateCompletedTask = () => {
        const { todos } = project
        const totalCompleted = todos?.reduce((acc, todo) => {
            if (todo.status === "Completed") {
                return acc + 1
            }
            return acc
        }, 0)
        setNumber(totalCompleted)
    }

    useEffect(() => {
        calculateCompletedTask()
    }, [])

    return (<>
        <div className="border p-5 rounded-lg border-violet-900 hover:border-violet-500  max-w-[300px] max-h-[100p]">
            <p className="font-sans font-semibold py-5 ">
                {project?.title}
            </p>
            <p className="text-xs break-words font-light text-slate-200">
                {project?.description}
            </p>
            <p className="text-sm my-5"><span className="text-violet-400">Summary</span> : {numOfCompletd} / {project?.todos?.length} todos completed</p>
            <button className="w-full border my-3 bg-violet-700">Export</button>
            <button className="w-full border bg-violet-700" onClick={onClose}>Details</button>
        </div>
        <Modal isOpen={open} onClose={onClose}>
            <div className="border rounded-lg border-violet-900 hover:border-violet-800 p-3 h-full ">
                <p className="font-sans font-semibold py-5 text-black text-3xl">
                    {project?.title}
                </p>
                <p className="text-xs break-words text-black mb-4">
                    Description: {project?.description}
                </p>
                <p className=" break-words font-semibold text-black mb-2 text-md">
                    Task
                </p>
                {/* <p className="text-sm my-5 text-black   "><span className="text-violet-700">Summary</span> : {numOfCompletd} / {project?.todos?.length} todos completed</p> */}
                {/* <button className="w-full border my-3 bg-violet-700">Export</button> */}
                {/* <button className="w-full border bg-violet-700" onClick={onClose}>Details</button> */}
                {
                    project?.todos?.map((todo, index) => (<>
                        <div
                            key={index}
                            className='flex items-center justify-between w-auto '>
                            <div className='flex justify-center items-center gap-4'>
                                <p className='text-black border rounded-full p-1 text-xs bg-violet-600'></p>
                                {/* {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="rounded-md focus:outline-none bg-transparent text-black "
                                        value={todo}
                                        // onChange={(e) => saveTodo(index, e.target.value)}
                                        autoFocus
                                    />
                                ) : (
                                    <p className='text-gray-700 font-sans text-sm'>{todo}</p>
                                    )} */}
                                <p className='text-gray-700 font-sans text-sm'>{todo.description}</p>
                                <div className='flex justify-center items-center gap-2'>




                                </div>
                            </div>
                        </div>
                    </>
                    ))
                }
            </div>
        </Modal>
    </>
    )
} 