import Icon from "../../../../ui/Icon";

type TOrderSummaryProps = {
  title?: string;
  legendColor?: string;
  figure?: number;
  trendPercentage?: number;
};
export function OrderSummaryCard({
  title = "Total order",
  legendColor = "bg-light-gray-600",
  figure = 0,
  trendPercentage = 4.7,
}: TOrderSummaryProps) {
  return (
    <div className='w-full bg-background border border-[#E3E3E3] border-opacity-50 p-6 rounded-lg'>
      <div className='flex justify-between'>
        <h4 className='font-OpenSans font-normal text-lg'>{title}</h4>
        <span className={`h-10 w-10 rounded-full ${legendColor}`}></span>
      </div>
      <div className='flex justify-between mt-8 items-end'>
        <h3 className='font-OpenSans font-semibold text-4xl'>{figure}</h3>
        <span className={`flex items-end text-primary gap-x-2`}>
          <Icon name='trending-up' size={15} />
          {trendPercentage}%
        </span>
      </div>
    </div>
  );
}
