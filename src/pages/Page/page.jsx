import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import './page.css';
import Loading from '../../components/loading/loading';

const PageButton = styled(Button)`
  && {
    background-color: #15b1b9;
    color: #ffffff;
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
function Page({ loading }) {
    return (
        <motion.div
            className="container-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="home-card">
                        <img width="200px" height="200px" src={Logo} alt="Mashed icon" />
                        <h3>MashedBot</h3>
                    </div>
                    <ButtonContainer>
                    <Link to="/about">
                        <PageButton>NEXT</PageButton>
                    </Link>
                    </ButtonContainer>
                </>
            )}
        </motion.div>
    );
}

export default Page;
