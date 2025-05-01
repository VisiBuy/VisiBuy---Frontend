import { TOrderStatus } from "../../../../types/status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../ui/Tabs";
import { Table } from "@tanstack/react-table";
import { useCallback } from "react";
import { ISellerOrder } from "../../models/orders";

export interface ITabs {
  value: TOrderStatus | "all_orders";
  title: string;
}
export function OrderTabs({
  tabs,
  table,
}: {
  tabs: ITabs[];
  table: Table<ISellerOrder>;
}) {
  const handleResetFilters = useCallback(() => {
    return table.resetColumnFilters();
  }, []);
  const handleSetFilter = useCallback((event: any) => {
    return table
      .getColumn("status")
      ?.setFilterValue(event.target.getAttribute("data-value"));
  }, []);

  return (
    <div className='py-12 w-full'>
      <Tabs defaultValue='all_orders' className=''>
        <TabsList className="flex  justify-between overflow-x-scroll">
          {tabs.map(({ title, value }) =>
            value === "all_orders" ? (
              <TabsTrigger
                key={value}
                className='flex justify-center text-center font-OpenSans font-medium text-xl w-full'
                value={value}
                onClick={handleResetFilters}
                data-value={value}
              >
                {title}
              </TabsTrigger>
            ) : (
              <TabsTrigger
                key={value}
                className='flex justify-center text-center font-OpenSans font-medium text-xl w-full'
                value={value}
                onClick={handleSetFilter}
                data-value={value}
              >
                {title}
              </TabsTrigger>
            )
          )}
        </TabsList>
      </Tabs>
    </div>
  );
}
