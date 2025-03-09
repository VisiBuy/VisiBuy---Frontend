import { TOrderStatus } from "../../../../types/status";
import { Row } from "@tanstack/react-table";
import { ISellerOrder } from "../../models/orders";

export const startsWithFilterFn = <TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string // Change to explicitly string
) => {
  const cellValue = row.getValue(columnId);

  // Handle potential null/undefined values and convert to string
  const stringValue =
    cellValue !== undefined && cellValue !== null
      ? String(cellValue).toLowerCase().trim()
      : "";

  return stringValue.startsWith(filterValue.toLowerCase().trim());
};

export const getSalesSummary = (orders: ISellerOrder[]) => {
  const statusSummary = {
    delivered: 0,
    cancelled: 0,
    accepted: 0,
    pending: 0,
    dispatched: 0,
  };

  if (!orders || orders.length <= 0) return statusSummary;
  orders.forEach((item, index: any) => {
    if (statusSummary.hasOwnProperty(item.status)) {
      statusSummary[item.status] = statusSummary[item.status] + 1;
    }
  });
  return statusSummary;
};
