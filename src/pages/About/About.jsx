import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { motion } from "framer-motion";
import Logo from '../../logo.svg';
import Loading from '../../components/loading/loading';


const PageButton = styled(Button)`
  && {
    background-color: #15b1b9;
    color: #ffffff;
    text-decoration:none;
    margin-right: 10px;
    &:hover {
      background-color: #39f6ff;
      color: #ffffff;
    }
  }
`;
const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


function About({ loading }) {
    const [showContent, setShowContent] = useState(false);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    if (loading) {
        return <Loading />;
    }

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
                        I am an AI language model developed by Faten Khoder, known as MashedBot.
                        My purpose is to assist and provide information on a wide range of topics.
                        I have been trained on a diverse corpus of text. I can help answer questions, provide explanations, offer suggestions.
                    </p>
                    {showContent && (
                        <p className="additional-content">
                            However, it's important to note that I am an artificial intelligence and do not possess personal experiences, emotions, or consciousness.
                            My responses are generated based on patterns and information present in the training data.
                            I'm here to assist you to the best of my abilities, so feel free to ask me anything you'd like to know!
                        </p>
                    )}
                    <button className="btn-about" onClick={toggleContent}>
                        {showContent ? 'Read less' : 'Read more'}
                    </button>
                </div>
            </div>
            <ButtonContainer>
                <Link to="/sign">
                    <PageButton>Next</PageButton>
                </Link>
            </ButtonContainer>
        </motion.div>
    );
}

export default About;
