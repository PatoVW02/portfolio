import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "../components/navbar";
import Background from "../components/background";

const MainLayout = ({ projectsRef, contactRef }) => {
    return (
        <div>
            <Background style={{ zIndex: -1 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div>
                    <Navbar projectsRef={projectsRef} contactRef={contactRef} />
                </div>

                <div style={{
                    marginTop: "2.5%",
                    marginLeft: "5%",
                    marginRight: "5%",
                }}>
                    <Outlet />
                </div>
            </div>

            <Analytics />
        </div>
    )
};

export default MainLayout;
