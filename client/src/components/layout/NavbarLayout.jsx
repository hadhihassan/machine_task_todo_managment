import { useContext } from 'react'
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function NavBarLayout() {
    

    const { logout }  = useContext(AuthContext);
    const navigate = useNavigate()

    function handleLogout(){
        navigate("/login")
        logout()
    }
    return (
        <><div className="flex-row">
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <Link to="/" className="mt-auto">
                        <p className="mb-0 mt-auto font-display text-3xl font-bold">
                            Project managment
                        </p>
                    </Link>
                    <nav className="flex gap-4 ">
                        <button className="bg-black" onClick={handleLogout}>LogOut</button>
                    </nav>
                </div>
            </header>
            <Outlet />
        </div>
        </>
    );
}