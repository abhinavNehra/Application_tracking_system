import { type SignupSchemaType, SignupSchema } from '@ats/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Form, Link, redirect } from 'react-router';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';

import api from '../../utils/api';

import type { Route } from '../../components/auth/+types/sign-up';

const resolver = zodResolver(SignupSchema);

export async function action({ request }: Route.ActionArgs) {
    const { errors, data } = await getValidatedFormData<SignupSchemaType>(
        request,
        resolver
    );
    if (errors) {
        return errors;
    }

    const response = await api({
        url: '/api/auth/sign-up',
        method: 'POST',
        body: data,
    });

    if (response.status === true) {
        redirect('login');
    } else {
        if (response.data) {
            return response.data;
        } else {
            return 'Error while creating user';
        }
    }
}

export default ({ actionData }: Route.ComponentProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useRemixForm<SignupSchemaType>({
        resolver,
    });

    return (
        <Box
            component="section"
            sx={{
                padding: 2,
                border: '1px dashed grey',
                width: '50%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            <Box>
                <Container>
                    {actionData ? <>{JSON.stringify(actionData)}</> : null}
                </Container>
            </Box>
            <Form
                onSubmit={handleSubmit}
                method="post"
                style={{ width: '100%' }}
                noValidate
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    error={errors.username ? true : false}
                    {...register('username', { required: true })}
                />
                {errors.username && <>{errors.username.message}</>}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    margin="normal"
                    error={errors.email ? true : false}
                    {...register('email', { required: true })}
                />
                {errors.email && <>{errors.email.message}</>}

                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    error={errors.password ? true : false}
                    {...register('password', { required: true })}
                />
                {errors.password && <>{errors.password.message}</>}
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    error={errors.verifyPassword ? true : false}
                    {...register('verifyPassword', { required: true })}
                />
                {errors.verifyPassword && <>{errors.verifyPassword.message}</>}

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>

                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Link to="/login">
                        <Typography variant="body2">
                            Already have an account? Login
                        </Typography>
                    </Link>
                </Box>
            </Form>
        </Box>
    );
};
