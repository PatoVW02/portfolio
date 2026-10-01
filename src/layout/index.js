import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";

const MainLayout = ({ projectsRef, contactRef }) => {
    return (
        <>
            <Navbar projectsRef={projectsRef} contactRef={contactRef} />

            <main>
                <Outlet />
            </main>

            <footer className="site-footer">
                <div className="container site-footer-inner">
                    <span>© {new Date().getFullYear()} Patricio Villarreal</span>
                    <span className="site-footer-muted">Monterrey, MX</span>
                </div>
            </footer>
        </>
    )
};

export default MainLayout;
