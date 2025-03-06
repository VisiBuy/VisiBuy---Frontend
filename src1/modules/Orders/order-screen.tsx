import { MainLayout } from "../../layouts/main-layout";
import { OrderSummaryCard } from "./features/components/order-summary-card";

export function OrderSreen() {
  return (
    <MainLayout title='Order Management'>
      <div className='grid grid-cols-5 gap-x-4'>
        <OrderSummaryCard figure={620} />
        <OrderSummaryCard title='Pending' legendColor='bg-blue' figure={601} />
        <OrderSummaryCard
          title='Accepted'
          figure={600}
          legendColor='bg-[#FFA600]'
        />
        <OrderSummaryCard
          title='Dispatched'
          figure={489}
          legendColor='bg-[#FF6200]'
        />
        <OrderSummaryCard
          title='Delivered'
          legendColor='bg-primary'
          figure={312}
        />
      </div>
    </MainLayout>
  );
}
