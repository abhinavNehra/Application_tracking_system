import { Bars2Icon } from "@heroicons/react/24/solid";
import { AppBar, Box, Toolbar } from '@mui/material';

import useStore from '../store/layout';

function ToggleSidebarButton() {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

    return (
        <Box onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Bars2Icon className="size-24 text-white-500" />
        </Box>
    );
}

function NavigationBar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <ToggleSidebarButton />
            </Toolbar>
        </AppBar>
    );
}

export default NavigationBar;
