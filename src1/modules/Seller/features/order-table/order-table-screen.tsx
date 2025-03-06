import { MainLayout } from "../../../../layouts/main-layout";
import { OrderSummaryCard } from "../../../Orders/features/components/order-summary-card";
import { SellerOrderTable } from "./order-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ISellerOrder, ISellerOrderQueryParams } from "../../models/orders";
import { columns } from "./column-def";
import { ITabs, OrderTabs } from "./order-tabs";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { dashboardConfig } from "../../../../lib/config";
import Icon from "../../../../ui/Icon";
import { useGetSellerOrdersQuery } from "../../queries/order/queries";
import { Pagination } from "../../../../common/components/pagination";
import { useMemo, useState } from "react";
import { SellerOrderQueryBuilder } from "../../lib/orders/order-query-builder";
import { OverlaySpinner } from "../../../../common/components/modal-spinner";
import { RootState } from "../../../../store/store";
import { useAppSelector } from "../../../../hooks/app-hooks";
const orders: ISellerOrder[] = [
  {
    id: "1",
    invoiceId: "fsdsd",
    productName: "Nike Air Jordan",
    img_url: "/sneaker.png",
    price: 14000,
    orderNumber: 1235,
    status: "accepted",
    orderDate: new Date(),
  },
];
const tabs: ITabs[] = [
  { value: "all_orders", title: "All Orders" },
  { value: "pending", title: "Pending" },
  { value: "accepted", title: "Accepted" },
  { value: "dispatched", title: "Dispatched" },
  { value: "delivered", title: "Delivered" },
  { value: "cancelled", title: "Cancelled" },
];
export function SellerOrderScreen() {
  const { orderId } = useParams();
  const root = useAppSelector((state: RootState) => state.root);
  const [queryParams, setQueryParams] = useState<ISellerOrderQueryParams>({
    page: 1,
    pageSize: 10,
    status: "all_orders",
  });
  const match = useMatch(dashboardConfig.getFullPath("seller", "orders"));
  const isMathRoute = match ? true : false;
  const { data, isFetching } = useGetSellerOrdersQuery(
    queryParams,
    isMathRoute
  );
  const table = useReactTable({
    initialState: {
      columnVisibility: {
        img_url: false, // hide this column by id
      },
      columnFilters: [
        {
          id: "status",
          value: "",
        },
      ],
    },

    data: data?.data.orders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      {match ? (
        <div>
          <MainLayout title='Order Management'>
            <div className='grid grid-cols-5 gap-x-4'>
              <OrderSummaryCard figure={data?.data.total_orders} />
              <OrderSummaryCard
                title='Pending'
                legendColor='bg-blue'
                figure={data?.data.sellerOrderSummary.pending}
              />
              <OrderSummaryCard
                title='Accepted'
                figure={data?.data.sellerOrderSummary.accepted}
                legendColor='bg-[#FFA600]'
              />
              <OrderSummaryCard
                title='Dispatched'
                figure={data?.data.sellerOrderSummary.dispatched}
                legendColor='bg-[#FF6200]'
              />
              <OrderSummaryCard
                title='Delivered'
                legendColor='bg-primary'
                figure={data?.data.sellerOrderSummary.delivered}
              />
            </div>
            <OrderTabs tabs={tabs} table={table} />
            <div className='relative'>
              <SellerOrderTable table={table} />
              <OverlaySpinner open={isFetching || root.isLoading} />
            </div>
          </MainLayout>
          <Pagination<ISellerOrderQueryParams>
            setQueryParam={setQueryParams}
            totalPages={data?.totalPages ?? 0}
            isFetching={isFetching}
            queryParams={queryParams}
            queryBuilder={SellerOrderQueryBuilder}
          />
        </div>
      ) : (
        <MainLayout
          title={
            <div className='flex gap-x-4 items-center'>
              <Link to='' className='bg-light-gray px-4 py-2 '>
                {" "}
                <Icon name='move-left' width={20} />
              </Link>

              {`Order details (#${orderId})`}
            </div>
          }
        >
          <Outlet />
        </MainLayout>
      )}
    </>
  );
}
