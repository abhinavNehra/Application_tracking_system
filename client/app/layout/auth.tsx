import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Outlet, redirect } from 'react-router';

import api from '../utils/api';

export async function loader() {
    // Call api to check if user is login or not
    const result = await api({
        url: '/api/user',
        method: 'GET',
    });

    if (result?.success) {
        return redirect('/');
    }
}

export default function AuthLayout() {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Box>
                        <h1>LOGO</h1>
                    </Box>
                </Toolbar>
                {/* <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box>
              <h1>L</h1>
            </Box>
          </Toolbar>
        </Container> */}
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
}
