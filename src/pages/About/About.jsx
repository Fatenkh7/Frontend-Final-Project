import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Button from '../../components/Button/Button';
import { motion } from "framer-motion";
import Logo from '../../logo.svg';

function About() {
    const [showContent, setShowContent] = useState(false);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    return (
        <motion.div
            className="about-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <div className='logo-about'>
                <img width="750px" height="750px" src={Logo} alt="Mashed icon" />
            </div>
            <div className="about-card">
                <div className="content">
                    <p className="heading">What is MashedBot</p>
                    <p className="para">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam at voluptas
                        minus culpa deserunt delectus sapiente inventore pariatur. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Modi laboriosam at voluptas minus culpa deserunt delectus
                    </p>
                    {showContent && (
                        <p className="additional-content">
                            Additional content Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
                            consequuntur voluptatem dicta inventore ducimus rem ea, dolor magnam aliquam porro?
                        </p>
                    )}
                    <button className="btn-about" onClick={toggleContent}>
                        {showContent ? 'Read less' : 'Read more'}
                    </button>
                </div>
            </div>
            <Link to="/sign">
                <Button />
            </Link>
        </motion.div>
    );
}

export default About;
