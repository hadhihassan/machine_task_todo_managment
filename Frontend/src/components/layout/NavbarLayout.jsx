import { Link, Outlet } from "react-router-dom";

export default function NavBarLayout() {
    return (
        <><div className="flex-row">
            <header className="sticky top-0 mb-6 bg-accent py-4 shadow">
                <div className="container flex justify-between">
                    <Link to="/" className="mt-auto">
                        <p className="mb-0 mt-auto font-display text-3xl font-bold">
                            Projects
                        </p>
                    </Link>
                    {/* <nav className="flex gap-4 ">
                        <button>Login</button>
                        <button>Sign up</button>
                    </nav> */}
                </div>
            </header>
            <Outlet />
        </div>
        </>
    );
}