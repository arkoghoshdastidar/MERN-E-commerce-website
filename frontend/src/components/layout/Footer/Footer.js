import styles from './Footer.module.css';
import { BsLinkedin } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <div className={styles['footer']}>
            <div>
                All rights reserver <AiOutlineCopyrightCircle /> {date}
            </div>
            <Link to='https://www.linkedin.com/in/arko-ghosh-dastidar-93a792202/' >
                < BsLinkedin className={styles['contact-link']} />
            </Link>
            <Link to='mailto:arkoghoshdastidar392000@gmail.com'>
                < CgMail className={styles['contact-link']} />
            </Link>
        </div>
    );
}

export default Footer;