import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect/dist/core';
import Loading from '../../components/loading/loading';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #141414;
`;

const BotContainer = styled(Box)`
  padding: 50px;
  border-radius: 10px;
  background-color: #1c1c1c;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BotIcon = styled(motion.img)`
  width: 200px;
  height: 300px;
`;

const Text = styled(Typography)`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 30px;
  font-family: emoji;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
`;

const ButtonBase = styled(Button)`
  && {
    background-color: #15b1b9;
    color: #ffffff;
    text-decoration: none;
    margin: 0 10px;
    &:hover {
      background-color: #39f6ff;
      color: #ffffff;
    }
  }
`;

const SignInButton = styled(ButtonBase)`
  && {
    margin-right: 10px;
  }
`;

const SignUpButton = styled(ButtonBase)`
  && {
    border: 1px solid #03e9f4;
    background-color: #1c1c1c;
    color: #ffffff;
    margin-left: 10px;
  }
`;

const ContactLink = styled.a`
  text-decoration: underline;
  color: #ffffff;
  margin-top: 10px;
`;

const FirstPage = ({ loading }) => {
  const [typewriterText, setTypewriterText] = useState("");
  useEffect(() => {
    const typewriter = new Typewriter('#typewriter', {
      strings: ['Hello, I am Mashed-Bot', 'How may I assist you?'],
      autoStart: true,
      delay: 50,
      deleteSpeed: 20,
      loop: true
    });

    return () => {
      typewriter.stop();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <BotContainer>
        <AnimatePresence>
          <BotIcon
            src={logo}
            alt="bot icon"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <Text variant="body1" id="typewriter" />
        <ButtonContainer>
          <ButtonLink to="/signin">
            <SignInButton variant="contained">Sign In</SignInButton>
          </ButtonLink>
          <ButtonLink to="/signup">
            <SignUpButton variant="contained">Sign Up</SignUpButton>
          </ButtonLink>
        </ButtonContainer>
        <ContactLink href="/contact">Contact Us</ContactLink>
      </BotContainer>
    </Container>
  );
};

export default FirstPage;