import { useState } from 'react'
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast'
import { createNewProject } from '../services/ProjectService';
import { projectSchema } from '../schema/projectSchema'


export default function ProjectForm(props) {

    
    const [isEditing, setIsEditing] = useState({});

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            todo: '',
            todos: [],
        },
        validationSchema: projectSchema,
        onSubmit: async (values) => {
            try {
                const { data } = await createNewProject(values)
                if (!data.success) {
                    return toast(data.message)
                }
                toast(() => (
                    <span className='flex justify-center items-center text-sm gap-2'>
                        Success fully created a new project
                    </span>
                ));
                props.update()
            } catch (error) {
                console.log(error)
                if (error.response.data.errors.length) {
                    return toast.error(error.response.data.errors.map(err => err.msg).join(", "));
                }
                let errorMessage = "Account Created Failed";
                if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
                return toast.error(errorMessage || 'Internal Server error')
            }
        }
    });

    const editTodo = (index) => {
        setIsEditing(prevState => ({ ...prevState, [index]: true }));
    }

    const deleteTodo = (index) => {
        const updatedTodos = [...formik.values.todos];
        updatedTodos.splice(index, 1);
        formik.setFieldValue("todos", updatedTodos)
    }

    const addTodo = () => {

        if (formik.values.todo.trim() === "") {
            formik.setFieldError("todo", "Empty task is not allowed");
            return;
        }

        const updatedTodos = [...formik.values.todos, formik.values.todo.trim()];
        formik.setFieldValue("todos", updatedTodos);
        formik.setFieldValue("todo", "");

        formik.setFieldError("todo", null);
    }

    const saveTodo = (index, newValue) => {
        const updatedTodos = [...formik.values.todos];
        updatedTodos[index] = newValue;
        formik.setFieldValue("todos", updatedTodos);
    };


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className='p-4'>
                <p className='text-2xl text-center text-black font-semibold font-sans py-5'>Create new project</p>
                <div className="mb-4 text-start">
                    <label htmlFor="title" className="block text-gray-950 font-sans ">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="title"
                        className={`w-full px-2  py-2 border rounded-md focus:outline-none bg-transparent text-black ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        {...formik.getFieldProps('title')}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="mb-4 text-start">
                    <label htmlFor="description" className="block text-gray-950 font-sans">Description</label>
                    <textarea
                        id="description"
                        name="description"

                        type=""
                        className={`w-full px-2 py-2 border rounded-md focus:outline-none bg-transparent text-black ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                    ) : null}
                </div>

                <div className="mb-4 text-start">
                    <label htmlFor="title" className="block text-gray-950 font-sans ">Task</label>
                    <div className='flex justify-center items-center mb-2'>
                        <input
                            id="todo"
                            name="todo"
                            type="title"
                            className={`w-full px-2 py-3 border-t border-b border-l rounded-md rounded-r-none focus:outline-none bg-transparent text-black ${formik.touched.todo && formik.errors.todo ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('todo')}
                        />
                        <button
                            type="button"
                            onClick={addTodo}
                            className="bg-violet-600 hover:bg-violet-700 font-bold text-xs px-9 py-4 rounded-l-none"
                        >
                            Add
                        </button>
                    </div>
                    {formik.touched.todo && formik.errors.todo ? (
                        <div className="text-red-500 text-sm">{formik.errors.todo}</div>
                    ) : null}
                </div>

                <div className='m-4'>
                    {formik?.values?.todos?.map((todo, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-between p-2 mb-1'>
                            <div className='flex justify-start items-center gap-2'>
                                <p className='text-black border rounded-full p-1 text-xs bg-violet-600'></p>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="rounded-md focus:outline-none bg-transparent text-black font-semibold "
                                        value={todo}
                                        onChange={(e) => saveTodo(index, e.target.value)}
                                        autoFocus
                                    />
                                ) : (
                                    <p className='text-gray-700 font-sans text-sm font-semibold'>{todo}</p>
                                )}
                            </div>
                            <div className='flex justify-end items-center gap-2'>
                                <button
                                    type="button"
                                    onClick={() => deleteTodo(index)}
                                    className="font-bold text-sm bg-violet-600 hover:bg-violet-700 p-2 text-white"
                                >
                                    Remove
                                </button>
                                <button
                                    type="button"
                                    onClick={() => isEditing[index] ? setIsEditing(prevState => ({ ...prevState, [index]: false })) : editTodo(index)}
                                    className="font-bold text-sm bg-violet-600 hover:bg-violet-700 p-2 text-white"
                                >
                                    {
                                        isEditing[index] ? "Save" : "Edit"
                                    }
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {formik.touched.todos && formik.errors.todos ? (
                    <div className="text-red-500 text-sm mb-2">{formik.errors.todos}</div>
                ) : null}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-sans font-semibold rounded-lg transition duration-300"
                >
                    Register
                </button>
            </form >
        </div >
    )
}