import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
    const navigate = useNavigate();

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