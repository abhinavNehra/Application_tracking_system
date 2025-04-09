import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Box, Toolbar } from '@mui/material';

import useStore from '../store/layout';

function ToggleSidebarButton() {
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

    return (
        <Box onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesomeIcon icon={faBars} />
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
