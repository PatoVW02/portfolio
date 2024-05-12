/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import { List, ArrowLeft } from 'react-bootstrap-icons';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import "../../styles/Navbar.css";

const Navbar = ({ projectsRef, contactRef }) => {
    const { width } = useWindowDimensions();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Listen to scroll events
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 50); // Set true if scrolled more than 50px
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to scroll to contact
    const executeContactScroll = () => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    // Function to scroll to projects
    const executeProjectsScroll = () => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            {width >= 1024 ? (
                <div className={isScrolled ? "navbar-container scrolled" : "navbar-container"}>
                    <div className="spacer"></div>
                    <nav className="navbar-items">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#" onClick={executeProjectsScroll}>Projects</a></li>
                            <li><a href="#" onClick={executeContactScroll}>Contact</a></li>
                        </ul>
                    </nav>

                    <div className="social-icons">
                        <SocialIcon url="https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://github.com/PatoVW02" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://www.instagram.com/patovw02" target="_blank" bgColor="transparent" fgColor='white' />
                    </div>
                </div>
            ) : (
                <div className="mobile-navbar-container">
                        {!drawerOpen ? (
                            <div className={isScrolled ? "open-drawer-menu scrolled" : "open-drawer-menu"}>
                                <div className="spacer"></div>
                                <List className={isScrolled ? "drawer-icon scrolled" : "drawer-icon"} onClick={() => setDrawerOpen(!drawerOpen)} />
                            </div>
                        ) : (
                            <div className="mobile-navbar-items">
                                <div className="close-drawer-arrow">
                                    <ArrowLeft onClick={() => setDrawerOpen(!drawerOpen)} />
                                </div>

                                <div className="page-links">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#" onClick={executeProjectsScroll}>Projects</a></li>
                                        <li><a href="#" onClick={executeContactScroll}>Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                </div>
            )}
        </>
    )
}

export default Navbar;
