import { Box, Drawer } from '@mui/material';

import { APPBAR_HEIGHT, DRAWER_WIDTH } from '~/layout/main';

import useStore from '../store/layout';

function Sidebar() {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width:(theme) => isSidebarOpen ? DRAWER_WIDTH : `calc(${theme.spacing(7)} + 1px)`,
                transition: (theme) =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                    top: APPBAR_HEIGHT,
                    height: `calc(100% - ${APPBAR_HEIGHT}px)`,
                    overflowX: 'hidden',
                    transition: (theme) =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        width:(theme) => isSidebarOpen ? DRAWER_WIDTH :`calc(${theme.spacing(7)} + 1px)`,
                    },
            }}
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
        >
            <Box>hello</Box>
            <Box>hello</Box>
            <Box>hello</Box>
            <Box>hello</Box>
            <Box>hello</Box>
            <Box>hello</Box>
            <Box>hello</Box>
        </Drawer>
    );
}

export default Sidebar;
