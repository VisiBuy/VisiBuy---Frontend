import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import type { ToastActionElement } from "./Toast";

// Types
export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export interface Toast extends ToastProps {
  id: string;
  open: boolean;
  createdAt: number;
}

// State interface
interface ToastState {
  toasts: Toast[];
  limit: number;
}

// Initial state
const initialState: ToastState = {
  toasts: [],
  limit: 1,
};

// Slice
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastProps>) => {
      const newToast: Toast = {
        ...action.payload,
        id: Date.now().toString(),
        open: true,
        createdAt: Date.now(),
      };
      state.toasts = [newToast, ...state.toasts].slice(0, state.limit);
    },
    updateToast: (
      state,
      action: PayloadAction<Partial<Toast> & { id: string }>
    ) => {
      const index = state.toasts.findIndex(
        (toast) => toast.id === action.payload.id
      );
      if (index !== -1) {
        state.toasts[index] = { ...state.toasts[index], ...action.payload };
      }
    },
    dismissToast: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        const index = state.toasts.findIndex(
          (toast) => toast.id === action.payload
        );
        if (index !== -1) {
          state.toasts[index].open = false;
        }
      } else {
        state.toasts.forEach((toast) => {
          toast.open = false;
        });
      }
    },
    removeToast: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.toasts = state.toasts.filter(
          (toast) => toast.id !== action.payload
        );
      } else {
        state.toasts = [];
      }
    },
    setToastLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      if (state.toasts.length > action.payload) {
        state.toasts = state.toasts.slice(0, action.payload);
      }
    },
  },
});

// Actions
export const {
  addToast,
  updateToast,
  dismissToast,
  removeToast,
  setToastLimit,
} = toastSlice.actions;

// Selectors
export const selectToasts = (state: RootState) => state.toast.toasts;
export const selectToastLimit = (state: RootState) => state.toast.limit;

export default toastSlice.reducer;
