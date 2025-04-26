import OrderSelectStatus from "../../../../common/components/status-selector";
import {
  formatCurrency,
  formatDate,
} from "../../../../lib/utils";
import Icon from "../../../../ui/Icon";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { ISellerOrder } from "../../models/orders";

export const columns: ColumnDef<ISellerOrder>[] = [
  {
    accessorKey: "img_url",
    header: "Image",
  },
  {
    accessorKey: "id",
    header: "S/N",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {" "}
          <img
            className="aspect-square border border-light-gray rounded-md mr-3 w-30"
            alt={row.getValue("productName")}
            src={row.getValue("img_url")}
          />
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => {
      return "#" + row.getValue("orderNumber");
    },
  },
  {
    accessorKey: "orderDate",
    header: "Date",
    cell: ({ row }) => {
      return formatDate(row.getValue("orderDate"));
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      return formatCurrency(row.getValue("price"), true, "₦");
    },
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <OrderSelectStatus
            status={row.getValue("status")}
            id={row.getValue("id")}
          />
          <Link to={`view/${row.getValue("id")}`}>
            <Icon
              name="ellipsis-vertical"
              className="text-secondary-foreground ml-4"
              size={15}
            />
          </Link>
        </div>
      );
    },
  },
];
