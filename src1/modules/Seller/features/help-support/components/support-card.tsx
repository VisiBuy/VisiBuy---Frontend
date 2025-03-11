import { SupportCardProps } from "../../../models/feedback";
import Icon from "../../../../../ui/Icon";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function SupportCard({
  title,
  icon,
  link,
  key,
}: Readonly<SupportCardProps>) {
  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate(link), []);
  return (
    <div
      className='flex items-center px-6 py-8 bg-blue-200 rounded-md hover:cursor-pointer'
      onClick={handleOnClick}
      key={key}
    >
      <span>
        <img src={icon} alt={title} />
      </span>
      <div className='flex-1 ml-4'>
        <h3 className='text-foreground text-2xl text-left font-Montserrat font-medium '>
          {title}
        </h3>
      </div>

      <span>
        <Icon name='chevron-right' className='text-blue' />
      </span>
    </div>
  );
}
