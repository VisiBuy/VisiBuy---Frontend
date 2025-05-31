// constants
export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
}

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: "WELCOME10", type: "percentage", value: 10 },
  { code: "BETAUSER", type: "percentage", value: 10 },
];
