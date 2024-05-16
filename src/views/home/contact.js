import { useState } from 'react';
import { m } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

import "../../styles/Contact.css"

const Contact = ({ contactRef }) => {
    const [isEmailCopied, setIsEmailCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("patovw@gmail.com");
        setIsEmailCopied(true);

        setTimeout(() => {
            setIsEmailCopied(false);
        } , 2000);
    }

    return (
        <>
            <m.h3
                className="secondary-title"
                ref={contactRef}
                whileInView={{
                    scale: 1.1,
                    transition: { duration: 1 }
                }}
            >
                {'< '}Contact Me{' />'}
            </m.h3>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="email-caption">
                        Get in touch
                        <span className="email-caption-light" onClick={copyEmail}>
                            {' (click to copy)'}
                        </span>
                    </div>

                    {!isEmailCopied ? (
                        <m.span
                            className="email"
                            onClick={copyEmail}
                            whileHover={{
                                scale: 1.1,
                                color: "#cfcfcf",
                                transition: { duration: 0 }
                            }}
                            whileTap={{
                                scale: 0.8,
                                color: "white",
                                transition: { duration: 0 }
                            }}
                        >
                            patovw@gmail.com
                        </m.span>
                    ) : (
                        <m.div className="email">
                            Email copied!
                        </m.div>
                    )}

                    <div className="location-detail">Location: Monterrey, Mexico</div>

                    <div className="social-media">
                        <SocialIcon className="social-icon" url="https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon className="social-icon" url="https://github.com/PatoVW02" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon className="social-icon" url="https://www.instagram.com/patovw02" target="_blank" bgColor="transparent" fgColor='white' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
