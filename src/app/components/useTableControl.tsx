"use client";
import { Selection, SortDescriptor } from "@nextui-org/table";
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FilterTodoTableSchema } from "./FilterTable";

enableMapSet();

export type TableControlState = {
  selectedKeys: Selection;
  sortDescriptor: SortDescriptor;
  searchValue: string;
  filter?: FilterTodoTableSchema;
};

export type TableControlAction = {
  setSelectedKeys: (selection: Selection) => void;
  setSortDescriptor: (sortDescriptor: SortDescriptor) => void;
  setSearchValue: (value: string) => void;
  addToSelection: (key: string) => void;
  clearSelection: () => void;
  setFilter: (filter: FilterTodoTableSchema) => void;
  clearFilter: () => void;
};

const initialState: TableControlState = {
  selectedKeys: new Set(),
  sortDescriptor: { column: "id", direction: "ascending" },
  searchValue: "",
};

export const useTableControl = create<TableControlState & TableControlAction>()(
  immer((set) => ({
    ...initialState,
    setSelectedKeys: (selection) =>
      set((state) => void (state.selectedKeys = selection)),
    setSortDescriptor: (sortDescriptor) =>
      set((state) => void (state.sortDescriptor = sortDescriptor)),
    setSearchValue: (value) => set((state) => void (state.searchValue = value)),
    clearSelection: () => set((state) => void (state.selectedKeys = new Set())),
    clearFilter: () => set((state) => void (state.searchValue = "")),
    addToSelection: (key) =>
      set((state) => {
        state.selectedKeys = new Set([key]);
      }),
    setFilter: (filter) => set((state) => void (state.filter = filter)),
  }))
);
