
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
/**
 * Format a number as currency with commas as thousands separators
 * @param {number} value - The number to format
 * @param {boolean} includeSymbol - Whether to include the currency symbol
 * @param {string} symbol - The currency symbol to use
 * @param {number} decimalPlaces - Number of decimal places to show
 * @returns {string} Formatted currency string
 */
export function formatCurrency(
  value: number,
  includeSymbol = true,
  symbol = "$",
  decimalPlaces = 2
) {
  // Handle non-numeric input
  if (value === null || value === undefined || isNaN(value)) {
    return includeSymbol ? `${symbol}0.00` : "0.00";
  }

  // Convert to number if it's a string
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Fixed decimal places
  const fixedValue = numericValue.toFixed(decimalPlaces);

  // Split into whole and decimal parts
  const [wholePart, decimalPart] = fixedValue.split(".");

  // Add commas to the whole part
  const wholeWithCommas = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine parts
  const formatted = decimalPart ? `${wholeWithCommas}.${decimalPart}` : wholeWithCommas;

  // Add symbol if needed
  return includeSymbol ? `${symbol}${formatted}` : formatted;
}

export const currencyFormmater = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
  }).format(amount);
};

export const capitalize = (text: string | undefined) => {
  if (!text) return "";
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
};
export class ImageLinkMap {
  links: Map<string, string>;
  constructor() {
    this.links = new Map();
    // bind the this keyword
    this.setImageLink = this.setImageLink.bind(this);
    this.removeImageLink = this.removeImageLink.bind(this);
    this.getImageLinks = this.getImageLinks.bind(this);
  }
  setImageLink(key: string, url: string) {
    return this.links.set(key, url);
  }
  getImageLink(key: string): string | undefined {
    return this.links.get(key);
  }
  hasImageLink(key: string) {
    return this.links.has(key);
  }
  removeImageLink(key: string) {
    return this.links.delete(key);
  }

  clearAllLinks() {
    this.links.clear();
  }
  getImageLinks() {
    return this.links.values();
  }
}
