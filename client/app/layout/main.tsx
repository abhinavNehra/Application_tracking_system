import { AppBar, Box } from '@mui/material';
import { Outlet } from 'react-router';

import NavigationBar from '../components/navigationBar';
import Sidebar from '../components/sidebar';

export const APPBAR_HEIGHT = 64;
export const DRAWER_WIDTH = 240;

function MainLayout() {
    return (
        <Box sx={{ minHeight: '100%', width: '100%' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    height: APPBAR_HEIGHT,
                }}
            >
                <NavigationBar />
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100%',
                    width: '100%',
                    margin: 0,
                    padding: 0,
                }}
            >
                <Sidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                        minHeight: '100vh',
                        marginTop: `${APPBAR_HEIGHT}px`,
                        backgroundColor: (theme) =>
                            theme.palette.background.default,
                        transition: (theme) =>
                            theme.transitions.create(['width', 'margin'], {
                                easing: theme.transitions.easing.sharp,
                                duration:
                                    theme.transitions.duration.leavingScreen,
                            }),
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default MainLayout;
