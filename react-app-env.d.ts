/// <reference types="redux-persist" />
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

// src/global.d.ts

declare global {
  interface Window {
    fbq: (
      eventName: string,
      event_type?: any,
      eventData: Record<string, any>
    ) => void;
  }
}

export {};
