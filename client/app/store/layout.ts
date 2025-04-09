import { create } from "zustand";

type Store = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const useStore = create<Store>((set) => ({
    isSidebarOpen: false,
    setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
}));

export default useStore;
