// import { useAppSelector } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
// import Spinner from "../spinners/Spinner";

export default function AuthLayout() {
    // const { isAuth, isLoading } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();

    // if (isLoading) {
    //     return <Spinner isLoading={true} />;
    // }
    const isAuth = undefined 
    if (isAuth) {
        navigate("/");
    }

    return (
        <main className="container grid min-h-screen place-items-center">
            <Outlet />
        </main>
    );
}