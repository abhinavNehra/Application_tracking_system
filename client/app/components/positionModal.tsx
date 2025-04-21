import { Box, CircularProgress, Typography } from '@mui/material';
import type React from 'react';
import { Form } from 'react-router';

import CustomModal from './customModal';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
    action?: string;
    method?: 'post' | 'get' | 'put' | 'delete';
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    opacity: 1,
    borderRadius: '10px',
};

export default function PositionModal({
    open,
    onClose,
    title,
    children,
    isLoading = false,
    action,
    method = 'post',
}: Props) {
    return (
        <CustomModal open={open} onClose={onClose}>
            <Box sx={style}>
                <Box
                    sx={{
                        textAlign: 'center',
                        borderBottom: '1px solid black',
                        width: '100%',
                    }}
                >
                    <Typography
                        sx={{ fontWeight: 700, fontSize: '30px', p: 1 }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 200,
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Form method={method} action={action}>
                            {children}
                        </Form>
                    )}
                </Box>
            </Box>
        </CustomModal>
    );
} 