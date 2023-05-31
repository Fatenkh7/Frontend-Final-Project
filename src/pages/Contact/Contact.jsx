import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { createMessage } from '../../api/contact';
import { Box, Button, Stack, TextField } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Loading from '../../components/loading/loading';

const theme = createTheme({
    palette: {
        metallicBlue: {
            main: '#000000',
            border: '#03e9f4',
        },
    },
});

const Contact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Added loading state
    const form = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            message: '',
        },
        validationSchema: yup.object({
            first_name: yup.string().trim().required('First name is required'),
            last_name: yup.string().trim().required('Last name is required'),
            email: yup.string().trim().required('Email is required').email('Invalid email address'),
            message: yup.string().trim().required('Message is required'),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true); // Set loading state to true
                const { response, error } = await createMessage(
                    values.first_name,
                    values.last_name,
                    values.email,
                    values.message
                );
                if (error) {
                    toast.error('Failed to send message.');
                } else {
                    navigate('/sign');
                    toast.success('Message sent successfully.');
                }
            } catch (error) {
                toast.error('Failed to send message.');
            } finally {
                setLoading(false); // Set loading state to false
            }
        },
    });

    if (loading) {
        return <Loading />;
    }

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
                    placeholder="Message"
                    name="message"
                    value={form.values.message}
                    onChange={form.handleChange}
                    error={form.touched.message && form.errors.message !== undefined}
                    helperText={form.touched.message && form.errors.message}
                    size="large"
                />
                <Button
                    type="submit"
                    size="large"
                    sx={{
                        color: theme.palette.metallicBlue.border,
                        borderLeft: 1,
                        backgroundColor: theme.palette.metallicBlue.main,
                    }}
                    disabled={form.isSubmitting}
                >
                    Send Message
                </Button>
            </Stack>
        </Box>
    );
};

export default Contact;