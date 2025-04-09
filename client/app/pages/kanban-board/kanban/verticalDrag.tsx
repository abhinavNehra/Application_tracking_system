import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { type DealsType } from './fake';
import SortableItem from './sortableItem';

function VerticalDrag(props: { deals: DealsType }) {
    return (
        <SortableContext
            items={props?.deals.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
        >
            {props?.deals.map((item) => (
                <SortableItem key={item.id} item={item} id={item.id} />
            ))}
        </SortableContext>
    );
}

export default VerticalDrag;
