import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { createNewProject } from '../services/ProjectService';



export default function ProjectForm() {

    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState({});


    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            todo: '',
            todos: [],
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .strict('Invalid title')
                .required('Name is required')
                .min(3, "Title must be at least 3 characters")
                .max(100, "Title must be at less than 100 characters"),
            description: Yup.string()
                .trim()
                .strict('Invalid description')
                .required('description is required')
                .min(3, "description must be at least 3 characters")
                .max(100, "description must be at less than 100 characters"),
            todo: Yup.string()
                .trim()
                .strict('Invalid task')
                .min(3, "Task must be at least 3 characters")
                .max(100, "Task must be at less than 100 characters"),
            todos: Yup.array()
                .of(Yup.string())
                .min(3, 'At least 3 task are required')
                .max(20, 'No more than 20 tasks allowed'),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await createNewProject(values)
                if (!data.success) {
                    return toast(data.message)
                }
                toast((t) => (
                    <span className='flex justify-center items-center text-sm gap-2'>
                        Verication needed
                        <button className='bg-violet-700 text-gray-950 font-sans font-semibold'  onClick={() => toast.dismiss(t.id)}>
                            Enter code to verify
                        </button>
                    </span>
                ));

                navigate("/verify-user")
            } catch (error) {
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

                <div className="mb-4 text-start">
                    <label htmlFor="title" className="block text-gray-950 font-sans ">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="title"
                        className={`w-full px-10  py-2 border rounded-md focus:outline-none bg-transparent text-black ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'
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
                        className={`w-full px-10 py-2 border rounded-md focus:outline-none bg-transparent text-black ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                    ) : null}
                </div>

                <div className="mb-4 text-start">
                    <label htmlFor="title" className="block text-gray-950 font-sans ">Task</label>
                    <div className='flex justify-center items-center'>
                        <input
                            id="todo"
                            name="todo"
                            type="title"
                            className={`mb-2 w-[80%] px-10  py-3 border rounded-md focus:outline-none bg-transparent text-black ${formik.touched.todo && formik.errors.todo ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('todo')}
                        />
                        <button
                            type="button"
                            onClick={addTodo}
                            className="text-violet-600 w-[20%] hover:texr-violet-700 font-bold text-xs text-center"
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
                            className='flex items-center justify-between'>
                            <div className='flex justify-center items-center gap-4'>
                                <p className='text-black border rounded-full p-1 text-xs bg-violet-600'></p>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="rounded-md focus:outline-none bg-transparent text-black "
                                        value={todo}
                                        onChange={(e) => saveTodo(index, e.target.value)}
                                        autoFocus
                                    />
                                ) : (
                                    <p className='text-gray-700 font-sans text-sm'>{todo}</p>
                                )}
                            </div>
                            <div className='flex justify-end items-center gap-4'>
                                <button
                                    type="button"
                                    onClick={() => isEditing[index] ? setIsEditing(prevState => ({ ...prevState, [index]: false })) : editTodo(index)}
                                    className="text-violet-600 outline-none  w-[20%] hover:text-violet-700 font-bold text-xs text-center"
                                >
                                    {
                                        isEditing[index] ? "Save" : "Edit"
                                    }
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteTodo(index)}
                                    className="text-violet-600 w-[20%] hover:text-violet-700 font-bold text-xs text-center"
                                >
                                    remove
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