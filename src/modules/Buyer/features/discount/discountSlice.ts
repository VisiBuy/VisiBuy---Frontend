// store/slices/discountSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DISCOUNT_CODES, DiscountCode } from "./discountCodes";

interface DiscountState {
  data: DiscountCode | null;
  error: string | null;
  usedCodes: string[];
}

const getUsedCodes = (): string[] => {
  const codes = localStorage.getItem("usedDiscountCodes");
  return codes ? JSON.parse(codes) : [];
};

const saveUsedCode = (code: string) => {
  const codes = getUsedCodes();
  if (!codes.includes(code)) {
    const updated = [...codes, code];
    localStorage.setItem("usedDiscountCodes", JSON.stringify(updated));
  }
};

const initialState: DiscountState = {
  data: null,
  error: null,
  usedCodes: getUsedCodes(),
};

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    applyDiscountCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.toUpperCase();

      if (state.usedCodes.includes(code)) {
        state.data = null;
        state.error = "Code already used";
        return;
      }

      const match = DISCOUNT_CODES.find((d) => d.code === code);

      if (match) {
        state.data = match;
        state.error = null;
        saveUsedCode(code);
        state.usedCodes.push(code);
      } else {
        state.data = null;
        state.error = "Invalid discount code";
      }
    },
    clearDiscount: (state) => {
      state.data = null;
      state.error = null;
    },
  },
});

export const { applyDiscountCode, clearDiscount } = discountSlice.actions;
export default discountSlice.reducer;
