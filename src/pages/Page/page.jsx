import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';
import './page.css';
import Loading from '../../components/loading/loading';
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
                    <Link to="/about">
                        <Button>Go to About Page</Button>
                    </Link>
                </>
            )}
        </motion.div>
    );
}

export default Page;
