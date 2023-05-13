import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createUser } from "../../api/apiUser";
import UserContext from "../../context/user";
import { Box, Button, Stack, TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        metallicBlue: {
            main: "#000000",
            border: "#03e9f4",
        },
    },
});

const SignUp = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [isRequest, setIsRequest] = useState(false);
    const form = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
        },
        validationSchema: yup.object({
            first_name: yup.string().trim().required("First name is required"),
            last_name: yup.string().trim().required("Last name is required"),
            email: yup
                .string()
                .trim()
                .required("Email is required")
                .email("Invalid email address")
                .min(23, "Email is not valid")
                .max(25, "Email is not valid"),
            username: yup
                .string()
                .trim()
                .required("Username is required")
                .min(4, "Username must be at least 4 characters")
                .max(9, "Username could be up too 9 characters"),
            password: yup
                .string()
                .trim()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters"),
        }),

        onSubmit: async (values) => {
            try {
                setIsRequest(true);
                const { response, err } = await createUser(values.first_name, values.last_name, values.username, values.email, values.password);
                if (err) {
                    toast.error(err.message || "Failed to sign up.");
                } else {
                    login(response);
                    navigate("/signin");
                    toast.success("Sign up success");
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsRequest(false);
            }
        },
    });

    return (
        <Box component="form" noValidate onSubmit={form.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    placeholder="First Name"
                    name="first_name"
                    value={form.values.first_name}
                    onChange={form.handleChange}
                    error={form.touched.first_name && form.errors.first_name !== undefined}
                    helperText={form.touched.first_name && form.errors.first_name}
                />
                <TextField
                    fullWidth
                    placeholder="Last Name"
                    name="last_name"
                    value={form.values.last_name}
                    onChange={form.handleChange}
                    error={form.touched.last_name && form.errors.last_name !== undefined}
                    helperText={form.touched.last_name && form.errors.last_name}
                />
                <TextField
                    fullWidth
                    placeholder="Email"
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    error={form.touched.email && form.errors.email !== undefined}
                    helperText={form.touched.email && form.errors.email}
                />
                <TextField
                    fullWidth
                    placeholder="Username"
                    name="username"
                    value={form.values.username}
                    onChange={form.handleChange}
                    error={form.touched.username && form.errors.username !== undefined}
                    helperText={form.touched.username && form.errors.username}
                />
                <TextField
                    fullWidth
                    placeholder="Password"
                    name="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    type="password"
                    error={form.touched.password && form.errors.password !== undefined}
                    helperText={form.touched.password && form.errors.password}
                />
                <Button
                    type="submit"
                    size="large"
                    sx={{
                        color: theme.palette.metallicBlue.border,
                        borderLeft: 1,
                        backgroundColor: theme.palette.metallicBlue.main,
                    }}
                    disabled={isRequest}
                >
                    Sign Up
                </Button>
            </Stack>
        </Box>
    );
};

export default SignUp;
