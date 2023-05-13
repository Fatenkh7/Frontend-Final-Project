import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignIn } from "../../api/apiUser";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const SignIn = () => {

    const theme = createTheme({
        palette: {
            metallicBlue: {
                main: '#000000',
                border: "#03e9f4",
            },
        },
    });
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Invalid email').required('Required'),
            password: yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await userSignIn(values.email, values.password);
                const { data } = response;
                toast.success('Successfully signed in');
                // You can store the user data in the UserContext here
                navigate('/home');
            } catch (err) {
                toast.error('Invalid email or password');
            }
        },
    });

    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    placeholder="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    placeholder="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    type="submit"
                    size="large"
                    sx={{ color: theme.palette.metallicBlue.border, borderLeft: 1, backgroundColor: theme.palette.metallicBlue.main }}
                >
                    signin
                </Button>
            </Stack>
        </Box>
    );
};

export default SignIn;
