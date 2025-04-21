import { Fade, Modal } from '@mui/material';
import type React from 'react';

type Props = {
    style?: object;
    open: boolean;
    children: React.JSX.Element;
    onClose: () => void;
};
export default (props: Props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade
                in={props.open}
                timeout={{ enter: 1000, exit: 1 }} // Split timeout for enter/exit
            >
                {props.children}
            </Fade>
        </Modal>
    );
};
