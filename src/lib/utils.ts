import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const createQueryString = (
  name: string,
  value: string,
  searchParams: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};

export function formatDate(inputDate: string | number | Date) {
  const currentDate = new Date();
  const targetDate = new Date(inputDate);

  // Calculate time difference
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Format time
  const hours = targetDate.getHours();
  const minutes = targetDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;

  // Determine date representation
  if (daysDiff === 0) {
    return `Today | ${timeString}`;
  } else if (daysDiff === 1) {
    return `Yesterday | ${timeString}`;
  } else {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = targetDate.getDate();
    const month = monthNames[targetDate.getMonth()];
    return `${day} ${month} | ${timeString}`;
  }
}

export const currencyFormmater = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
  }).format(amount);
};

export const capitalize = (text: string | undefined) => {
  if(!text) return '';
  return text.slice(0, 1).toUpperCase() + text.slice(1);
};
