import { useState } from 'react';
import { m } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

import "../../styles/Contact.css"

const EMAIL = "hey@patovw.com";

const Contact = ({ contactRef }) => {
    const [isEmailCopied, setIsEmailCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setIsEmailCopied(true);

        setTimeout(() => {
            setIsEmailCopied(false);
        }, 2000);
    }

    return (
        <section className="section contact" ref={contactRef} id="contact">
            <div className="container">
                <div className="section-head">
                    <span className="eyebrow">02 / Contact</span>
                    <h2 className="section-title">Let's build <em>something.</em></h2>
                </div>

                <p className="contact-lead">
                    Have a product in mind, a team that needs a fullstack hand, or just want to say hi?
                    My inbox is open.
                </p>

                <m.button
                    className={`contact-email ${isEmailCopied ? 'copied' : ''}`}
                    onClick={copyEmail}
                    whileTap={{ scale: 0.98 }}
                    aria-live="polite"
                >
                    <span className="contact-email-text">{isEmailCopied ? 'Copied to clipboard' : EMAIL}</span>
                    <span className="contact-email-hint">{isEmailCopied ? '✓' : 'click to copy'}</span>
                </m.button>

                <div className="contact-meta">
                    <div className="contact-meta-item">
                        <span className="contact-meta-label">Location</span>
                        <span>Monterrey, Mexico</span>
                    </div>

                    <div className="contact-meta-item">
                        <span className="contact-meta-label">Elsewhere</span>
                        <div className="contact-socials">
                            <SocialIcon url="https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4" target="_blank" bgColor="transparent" fgColor="currentColor" style={{ width: 36, height: 36 }} />
                            <SocialIcon url="https://github.com/PatoVW02" target="_blank" bgColor="transparent" fgColor="currentColor" style={{ width: 36, height: 36 }} />
                            <SocialIcon url="https://www.instagram.com/patovw02" target="_blank" bgColor="transparent" fgColor="currentColor" style={{ width: 36, height: 36 }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
