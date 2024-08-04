import { useFormik } from 'formik';
import * as Yup from 'yup';
import { verifyUser } from '../../services/AuthService'
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



export default function VerifyPage() {

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .trim()
                .required('Verify code is required')
                .min(6, "Veryy code must be 6 characters")
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await verifyUser(values);
                if (!data.success) {
                    return toast(data.message)
                }
                toast((t) => (
                    <span className='flex justify-center items-center text-sm gap-2'>
                        Verication needed
                        <button className='bg-violet-700 text-white text-xs' onClick={() => toast.dismiss(t.id)}>
                            Enter code to verify
                        </button>
                    </span>
                ));

                navigate("/login")
            } catch (error) {
                if (error?.response.data) {
                    toast.error(error.response.data.errors.map(err => err.msg).join(", "));
                }
                let errorMessage = "Account Created Failed";
                if (error instanceof AxiosError) {
                    errorMessage = error.response?.data.message;
                }
                toast.error(errorMessage || 'Internal Server error')
            }
        }
    });

    return (
        <div className='h-[65vh] w-[30vw] flex justify-center items-center roo '>
            <div className="form-container -700 h-[65vh] w-[30vw] flex-row pt-10 justify-center items-center">
                <div className="">
                    <div className=" font-semibold text-2xl mt-2 md:text-1xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-100 text-center">
                        Verify account
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit} className='p-5'>
                    <div className="mb-4 text-start">
                        <label htmlFor="code" className="block text-white">Verification code</label>
                        <input
                            id="code"
                            name="code"
                            type="code"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent ${formik.touched.code && formik.errors.code ? 'border-red-500' : 'border-gray-300'
                                }`}
                            {...formik.getFieldProps('code')}
                        />
                        {formik.touched.code && formik.errors.code ? (
                            <div className="text-red-500 text-sm">{formik.errors.code}</div>
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