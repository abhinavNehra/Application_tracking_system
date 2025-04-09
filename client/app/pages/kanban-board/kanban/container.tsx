import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { StageType } from './fake';
import VerticalDrag from './verticalDrag';

const PipelineStage = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.grey[50],
    minWidth: 280,
    margin: theme.spacing(1),
    height: 'calc(100vh - 200px)',
    overflowY: 'auto',
}));

function KanbanContainer(props: { id: number; item: StageType }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <PipelineStage
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">{props.item.title}</Typography>
                <Chip label={props.item.count} size="small" />
            </Box>
            {props?.item?.deals && (
                <VerticalDrag deals={props?.item?.deals} />
            )}
        </PipelineStage>
    );
}

export default KanbanContainer;
