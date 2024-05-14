import { m } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

import "../../styles/Contact.css"

const Contact = ({ contactRef }) => {
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
                Contact Me
            </m.h3>
            <div className="contact-content">
                <div className="contact-info">
                    <p>Email: <a href="mailto:patovw@gmail.com">patovw@gmail.com</a></p>

                    <div className="social-media">
                        <SocialIcon url="https://www.linkedin.com/in/patricio-villarreal-welsh-a786901b4" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://github.com/PatoVW02" target="_blank" bgColor="transparent" fgColor='white' />
                        <SocialIcon url="https://www.instagram.com/patovw02" target="_blank" bgColor="transparent" fgColor='white' />
                    </div>

                    <p>Location: Monterrey, Mexico</p>

                    <div className="contact-form">
                        <form>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <textarea placeholder="Message"></textarea>
                            <button type="submit" onClick={(e) => e.preventDefault()}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Contact;
