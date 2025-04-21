import { create } from 'zustand';

type StateType = {
    showAddPositionModal: boolean;
};

type ActionType = {
    toggleAddPositionModal: (flag: boolean) => void;
    reset: () => void;
};

const initialState: StateType = {
    showAddPositionModal: false,
};

export default create<StateType & ActionType>((set) => ({
    ...initialState,
    toggleAddPositionModal: (flag) =>
        set(() => ({ showAddPositionModal: flag })),
    reset: () => {
        set(initialState);
    },
}));
