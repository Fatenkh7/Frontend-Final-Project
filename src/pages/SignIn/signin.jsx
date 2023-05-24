import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { userSignIn } from '../../api/apiUser';
import { useContext, useEffect } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import UserContext from '../../context/user';
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

const SignIn = () => {
  const { login, user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => { }, []);
  const [isRequest, setIsRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().trim().required('Email is required').email('Invalid email address'),
      password: yup.string().trim().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      try {
        setIsRequest(true);
        setLoading(true);
        const { response, err } = await userSignIn(values.email, values.password);
        if (err) {
          toast.error(err.message || 'Failed to sign in.');
        } else {
          login(response);
          navigate('/home',  { state: { email: values.email } });
          toast.success('Sign in success');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsRequest(false);
        setLoading(false);
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
          placeholder="Email"
          name="email"
          value={form.values.email}
          onChange={form.handleChange}
          error={form.touched.email && form.errors.email !== undefined}
          helperText={form.touched.email && form.errors.email}
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
          Sign In
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
