import { Box } from '@mui/material';
import { useEffect } from 'react';

import Kanban from './kanban';

function Home() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, []);
    
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Kanban />
        </Box>
    );
}

export default Home;
