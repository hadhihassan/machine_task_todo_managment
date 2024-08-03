
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        }),
        onSubmit: (values) => {
            // Handle form submission
            console.log('Form data', values);
        }
    });

    return (
        <div className='h-[65vh] w-[30vw] flex justify-center items-center roo '>
            <div className="form-container -700 h-[65vh] w-[30vw] flex-row pt-10 justify-center items-center">
                <div className="">
                    <div className=" font-semibold text-2xl mt-2 md:text-1xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-100 text-center">
                        Login
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className='p-5'>
                    <div className="mb-4 text-start">
                        <label htmlFor="email" className="block text-white">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-4 text-start">
                        <label htmlFor="password" className="block text-white">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}