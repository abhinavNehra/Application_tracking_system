import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import usePositionStore from '@ats/client/app/store/position';


function PositionHeader() {
    const navigate = useNavigate()

    const toggleAddPositionModal = usePositionStore(
        useShallow((state) => state.toggleAddPositionModal
    ));

    return (
        <Box
            sx={{
                marginTop: 2,
                height: 40,
                borderBottom: 1,
                borderColor: 'divider',
                width: '100%',
                padding: '5px',
            }}
        >
            <Button
                onClick={() => {
                    console.log('hello')
                    toggleAddPositionModal(true);
                    navigate("/positions/add")
                }}
                sx={{
                    height: '90%',
                    margin: 'auto',
                    color: 'white', // Add text color
                }}
                variant="contained"
                size="large"
            >
                <PlusCircleIcon width="20px" height="20px" />
                <Typography sx={{ marginLeft: 1 }}>Add New Position</Typography>
            </Button>
        </Box>
    );
}

export default PositionHeader;
