"use client";
import { Selection, SortDescriptor } from "@nextui-org/table";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

enableMapSet();

export type TableControlState = {
  selectedKeys: Selection;
  sortDescriptor: SortDescriptor;
  filterValue: string;
};

export type TableControlAction = {
  setSelectedKeys: (selection: Selection) => void;
  setSortDescriptor: (sortDescriptor: SortDescriptor) => void;
  setFilterValue: (value: string) => void;
  addToSelection: (key: string) => void;
  clearSelection: () => void;
  clearFilter: () => void;
};

const initialState: TableControlState = {
  selectedKeys: new Set(),
  sortDescriptor: { column: "id", direction: "ascending" },
  filterValue: "",
};

export const useTableControl = create<TableControlState & TableControlAction>()(
  immer((set) => ({
    ...initialState,
    setSelectedKeys: (selection) =>
      set((state) => void (state.selectedKeys = selection)),
    setSortDescriptor: (sortDescriptor) =>
      set((state) => void (state.sortDescriptor = sortDescriptor)),
    setFilterValue: (value) => set((state) => void (state.filterValue = value)),
    clearSelection: () => set((state) => void (state.selectedKeys = new Set())),
    clearFilter: () => set((state) => void (state.filterValue = "")),
    addToSelection: (key) =>
      set((state) => {
        state.selectedKeys = new Set([key]);
      }),
  }))
);
