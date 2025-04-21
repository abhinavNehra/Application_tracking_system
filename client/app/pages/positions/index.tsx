import { Box } from '@mui/material';
import { Outlet } from 'react-router';

import Header from './header';
function Home() {
    return (
        <Box>
            <Header />
            {/* <AddPositionModal /> */}
            <Outlet />
        </Box>
    );
}

export default Home;
