// constants
export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
}

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: "WELCOME1", type: "percentage", value: 10 },
  { code: "WELCOME2", type: "percentage", value: 10 },
  { code: "WELCOME3", type: "percentage", value: 10 },
  { code: "WELCOME10", type: "percentage", value: 10 },
  { code: "NEWUSER", type: "percentage", value: 10 },
];
