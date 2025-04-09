import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

const DealCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    '&:hover': {
        boxShadow: theme.shadows[3],
    },
}));

type ItemType = {
    id: number;
    name: string;
    companyName: string;
    amount: number;
    closeDate: string;
};

function SortableItem(props: { item: ItemType; id: number }) {
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
        opacity: isDragging ? 0 : 1,
    };

    return (
        <Item
            id={props.id}
            ref={setNodeRef}
            deal={props.item}
            style={style}
            {...attributes}
            {...listeners}
        />
    );
}

export default SortableItem;

export const Item = forwardRef<
    HTMLDivElement,
    {
        id: number;
        deal: ItemType;
        overlay?: boolean;
        style?: React.CSSProperties;
    }
>(({ id, deal, overlay, ...props }, ref) => {
    if (overlay) {
        console.log(id, deal);
    }
    return (
        <Box ref={ref} {...props}>
            <DealCard>
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}
                    >
                        <Typography variant="subtitle1">{deal.name}</Typography>
                        <FontAwesomeIcon size="sm" icon={faBuilding} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {deal?.companyName}
                    </Typography>
                    <Typography variant="h6">{deal?.amount}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {deal?.closeDate}
                    </Typography>
                </CardContent>
            </DealCard>
        </Box>
    );
});