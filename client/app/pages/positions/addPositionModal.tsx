import { CreatePosition, type CreatePositionType } from '@ats/shared';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import CustomModal from '@ats/client/app/components/customModal';
import usePositionStore from '@ats/client/app/store/position';
import { handleZodError, type ErrorSchemaType } from '~/utils/handleZodError';

import type { Route } from './+types';

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

export async function action({ request }: Route.ActionArgs) {
    let formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const schema = CreatePosition.parse(data);
    } catch (error) {
        return handleZodError(error as unknown as ErrorSchemaType[])
    }
    console.log('data ---', data);
    return data;
}

const AddPositionModal = ({ actionData }: Route.ComponentProps) => {
    const toggleAddPositionModal = usePositionStore(
        useShallow((state) => state.toggleAddPositionModal)
    );
    const modalState = usePositionStore(
        useShallow((state) => state.showAddPositionModal)
    );

    const navigate = useNavigate();

    const handleClose = () => {
        toggleAddPositionModal(false);
        navigate(-1);
    };

    const { register } = useForm<CreatePositionType>({});
    console.log('-----', actionData)
    return (
        <CustomModal open={modalState} onClose={handleClose}>
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
                        Add New Position
                    </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                    <Form method="post">
                        <Box sx={{ margin: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined"
                                label="Name"
                                type="text"
                                variant="outlined"
                                required
                                error={!!actionData?.errors?.name}
                                {...register('name', {
                                    required: true,
                                })}
                            />
                            {actionData?.errors?.name?.message && (
                                <span>
                                    {actionData?.errors.name.message.toString()}
                                </span>
                            )}
                        </Box>
                        <Box sx={{ margin: 1 }}>
                            <TextField
                                fullWidth
                                id="outlined-number"
                                required
                                label="Number of opening"
                                type="number"
                                variant="outlined"
                                error={!!actionData?.errors?.positions}
                                {...register('positions', {
                                    required: true,
                                })}
                            />
                            {actionData?.errors?.name?.message && (
                                <span>
                                    {actionData?.errors.name.message.toString()}
                                </span>
                            )}
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                sx={{ m: 1 }}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                <Typography>Add Position</Typography>
                            </Button>
                            <Button
                                sx={{ m: 1 }}
                                onClick={handleClose}
                                variant="contained"
                                color="error"
                            >
                                <Typography>Cancel</Typography>
                            </Button>
                        </Box>
                        <Box>
                            {actionData?.error && (
                                <Typography>{actionData?.error}</Typography>
                            )}
                        </Box>
                    </Form>
                </Box>
            </Box>
        </CustomModal>
    );
};

export default AddPositionModal;
