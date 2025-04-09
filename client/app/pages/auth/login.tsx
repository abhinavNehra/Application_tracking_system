import { LoginSchema, type LoginSchemaType } from '@ats/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Form, Link } from 'react-router';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';

import type { Route } from './+types/login';


const resolver = zodResolver(LoginSchema);

export async function action({ request }: Route.ActionArgs) {
    const { errors, data } = await getValidatedFormData<LoginSchemaType>(
        request,
        resolver
    );
    if (errors) {
        return errors;
    }
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useRemixForm<LoginSchemaType>({
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
            <Box>
                <Container>
                    <Typography variant="h4">Login</Typography>
                </Container>
            </Box>
            <Container>
                <Form
                    method="post"
                    onSubmit={handleSubmit}
                    style={{ width: '100%' }}
                    noValidate
                >
                    <Stack spacing={2}>
                        <TextField
                            variant="outlined"
                            label="Email or Username"
                            type="text"
                            fullWidth
                            required
                            error={!!errors.username}
                            {...register('username', { required: true })}
                        />
                        {errors.username && <>{errors.username.message}</>}
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            error={!!errors.password}
                            {...register('password', { required: true })}
                        />
                        {errors.password && <>{errors.password.message}</>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Login
                        </Button>
                        <Link to="/sign-up" style={{ alignSelf: 'center' }}>
                            <Typography variant="body2">
                                Don't have an account? Sign up
                            </Typography>
                        </Link>
                    </Stack>
                </Form>
            </Container>
        </Box>
    );
};

export default Login;
