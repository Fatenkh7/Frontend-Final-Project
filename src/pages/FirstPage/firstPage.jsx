import React from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled(motion.img)`
  width: 150px;
  margin-bottom: 50px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SignInButton = styled(Button)`
  && {
    background-color: #03e9f4;
    color: #000000;
    margin-right: 10px;
    &:hover {
      background-color: #018ca1;
    }
  }
`;

const SignUpButton = styled(Button)`
  && {
    background-color: #03e9f4;
    color: #000000;
    margin-left: 10px;
    &:hover {
      background-color: #018ca1;
    }
  }
`;

const Title = styled(Typography)`
  font-family: 'Montserrat', sans-serif;
  margin-top: 30px;
`;

const FirstPage = () => {
    return (
        <Container>
            <AnimatePresence>
                <Logo
                    src={logo}
                    alt="logo"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>
            <Title variant="h4">Welcome to Mashed-Bot AI</Title>
            <ButtonContainer>
                <Link to="/signin">
                    <SignInButton variant="contained">Sign In</SignInButton>
                </Link>
                <Link to="/signup">
                    <SignUpButton variant="contained">Sign Up</SignUpButton>
                </Link>
            </ButtonContainer>
        </Container>
    );
};

export default FirstPage;
