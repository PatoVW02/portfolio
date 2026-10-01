/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { SocialIcon } from 'react-social-icons';
import { List, X } from 'react-bootstrap-icons';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import CVDoc from '../../assets/Patricio Villarreal Welsh.pdf';

import "../../styles/Navbar.css";

const SOCIALS = [
    "https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4",
    "https://github.com/PatoVW02",
    "https://www.instagram.com/patovw02",
];

const Navbar = ({ projectsRef, contactRef }) => {
    const { width } = useWindowDimensions();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock page scroll while the mobile drawer is open.
    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    const scrollTo = (ref) => (event) => {
        event.preventDefault();
        setDrawerOpen(false);
        if (ref) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const links = (
        <ul>
            <li><a href="#" onClick={scrollTo(null)}>Home</a></li>
            <li><a href="#projects" onClick={scrollTo(projectsRef)}>Projects</a></li>
            <li><a href="#contact" onClick={scrollTo(contactRef)}>Contact</a></li>
        </ul>
    );

    const wordmark = (
        <a href="#" className="navbar-wordmark" onClick={scrollTo(null)} aria-label="Back to top">
            PV<span>.</span>
        </a>
    );

    if (width >= 1024) {
        return (
            <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    {wordmark}

                    <nav className="navbar-links">{links}</nav>

                    <div className="navbar-right">
                        <div className="navbar-socials">
                            {SOCIALS.map((url) => (
                                <SocialIcon key={url} url={url} target="_blank" bgColor="transparent" fgColor="currentColor" style={{ width: 32, height: 32 }} />
                            ))}
                        </div>
                        <a className="navbar-cv" href={CVDoc} download="Patricio Villarreal Welsh" target="_blank" rel="noreferrer">
                            Download CV
                        </a>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            <header className={`navbar navbar-mobile ${isScrolled && !drawerOpen ? 'scrolled' : ''}`}>
                <div className="navbar-inner">
                    {wordmark}

                    <button
                        className="navbar-toggle"
                        onClick={() => setDrawerOpen((open) => !open)}
                        aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={drawerOpen}
                    >
                        {drawerOpen ? <X /> : <List />}
                    </button>
                </div>
            </header>

            {/* Kept outside the header: its backdrop-filter would otherwise trap this fixed drawer. */}
            <div className={`navbar-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
                <nav className="navbar-drawer-links">{links}</nav>

                <div className="navbar-drawer-footer">
                    <a className="navbar-cv" href={CVDoc} download="Patricio Villarreal Welsh" target="_blank" rel="noreferrer">
                        Download CV
                    </a>
                    <div className="navbar-socials">
                        {SOCIALS.map((url) => (
                            <SocialIcon key={url} url={url} target="_blank" bgColor="transparent" fgColor="currentColor" style={{ width: 36, height: 36 }} />
                        ))}
                    </div>
                </div>
            </div>

            {drawerOpen && <div className="navbar-backdrop" onClick={() => setDrawerOpen(false)} />}
        </>
    );
}

export default Navbar;
