import {
    closestCenter,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragOverEvent,
    type DragStartEvent,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import KanbanContainer from './container';
import { stages, type DealType, type StagesType, type StageType } from './fake';
import SortableItem from './sortableItem';
// type DragEndEvent = {
//     active: Active;
//     over: Over | null;
// };

type SelectedDealDetailsType = {
    deal: DealType | null;
    container: StageType | null;
    dealIndex: number;
    containerIndex: number;
};

function Kanban() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [items, setItems] = useState<StagesType>(stages);

    // const [containers, setContainers] = useState<StagesType>(
    //     stages
    //   );

    const [activeItem, setActiveItem] = useState<StageType | DealType | null>(
        null
    );

    const [clonedItems, setClonedItems] = useState<StagesType | null>(null);

    const lastOverId = useRef<UniqueIdentifier | null>(null);

    // const recentlyMovedToNewContainer = useRef(false);
    // const isSortingContainer =
    // activeId != null ? containers.includes(activeId) : false;

    const findContainerIndex = useCallback(
        (id: UniqueIdentifier) => {
            return items.findIndex((item) => item.id === id);
        },
        [items]
    );

    const findInItems = useCallback(
        (id: UniqueIdentifier): SelectedDealDetailsType | null => {
            let container = null;
            let containerIndex = -1;
            let selectedDeal = null;
            let dealIndex = -1;
            items.forEach((item, cIdx) => {
                item.deals.forEach((deal, dIdx) => {
                    if (deal.id === id) {
                        selectedDeal = deal;
                        container = item;
                        containerIndex = cIdx;
                        dealIndex = dIdx;
                    }
                });
            });

            if (selectedDeal == null) {
                return null;
            }

            return { deal: selectedDeal, container, dealIndex, containerIndex };
        },
        [items]
    );

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = useCallback(
        (event: DragStartEvent) => {
            const { active } = event;

            if (active) {
                const containerIndex = findContainerIndex(active.id);

                if (containerIndex != -1) {
                    setActiveItem(items[containerIndex]);
                    return;
                }

                const itemDetails = findInItems(active.id);
                if (itemDetails && itemDetails.dealIndex != null) {
                    setActiveItem(itemDetails.deal);
                    return;
                }
            }
        },
        [items, findContainerIndex, findInItems]
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);
        }
        setActiveItem(null);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const activeContainerIndex = findContainerIndex(active.id);
        const overContainerIndex = findContainerIndex(over.id);

        if (
            activeContainerIndex != -1 &&
            overContainerIndex != -1 &&
            activeContainerIndex != overContainerIndex
        ) {
            const newItems = arrayMove(
                items,
                activeContainerIndex,
                overContainerIndex
            );
            setItems(newItems);
            return;
        }

        const activeItemDetails = findInItems(active.id);
        const overItemDetails = findInItems(over.id);
        if (!activeItemDetails || !overItemDetails) {
            return;
        }

        if (
            activeItemDetails.containerIndex ===
                overItemDetails.containerIndex &&
            activeItemDetails.dealIndex != overItemDetails.dealIndex
        ) {
            const currentDeals = items[activeItemDetails.containerIndex].deals;
            const newDeals = arrayMove(
                currentDeals,
                activeItemDetails.dealIndex,
                overItemDetails.dealIndex
            );
            const newItems = JSON.parse(JSON.stringify(items));
            newItems[activeItemDetails.containerIndex].deals = newDeals;
            setItems([...newItems]);
            return;
        }

        
        console.log('overItemDetails', overItemDetails);
        console.log('activeItemDetails', activeItemDetails);
        if (
            activeItemDetails?.container?.id != overItemDetails?.container?.id
        ) {
            console.log('i am inside change container');
            const newItems = JSON.parse(JSON.stringify(items));
            console.log(
                'newItems[activeItemDetails.containerIndex].deals',
                newItems[activeItemDetails.containerIndex]
            );
            newItems[activeItemDetails.containerIndex].deals.splice(
                activeItemDetails.dealIndex,
                1
            );
            newItems[overItemDetails.containerIndex].deals.splice(
                overItemDetails.dealIndex,
                0,
                activeItemDetails.deal
            );

            console.log('newItems', newItems);
            setItems([...newItems]);
            return;
        }
    }

    function handleDragCancel() {
        console.log('drag cancel');
    }

    return (
        <Box sx={{ padding: 0, margin: 0, overflow: 'hidden' }}>
            {/* Stats Header */}
            {/* <Stats /> */}
            {/* Pipeline Stages */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragOver}
                onDragOver={handleDragOver}
                onDragCancel={handleDragCancel}
            >
                <Box sx={{ display: 'flex', overflowX: 'auto', pb: 2 }}>
                    <SortableContext
                        items={items}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((item, index) => (
                            <KanbanContainer
                                item={item}
                                id={item.id}
                                key={index}
                            />
                        ))}
                    </SortableContext>
                </Box>
                {mounted &&
                    createPortal(
                        <DragOverlay>
                            {activeItem ? (
                                'deals' in activeItem ? (
                                    <KanbanContainer
                                        id={activeItem.id}
                                        item={activeItem}
                                    />
                                ) : (
                                    <SortableItem
                                        id={activeItem.id}
                                        item={activeItem}
                                    />
                                )
                            ) : null}
                        </DragOverlay>,
                        document.body
                    )}
            </DndContext>
        </Box>
    );
}

export default Kanban;
