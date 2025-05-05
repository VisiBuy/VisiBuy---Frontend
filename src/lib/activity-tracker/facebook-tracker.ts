import { ActivityTracker } from "@/models/activity-tracker";

export class FacebookTracker implements ActivityTracker {
  trackUserActivity(
    eventName: string,
    event_type: string,
    eventData: Record<string, any>
  ): void {
    // Simulate tracking Facebook event via the fbq function
    if (window.fbq) {
      window.fbq(eventName, event_type, {
        ...eventData,
      });
      console.log(`Facebook Pixel: Tracked ${eventName} `, eventData);
    } else {
      console.error("Facebook Pixel is not initialized");
    }
  }
}

export const facebookTracker = new FacebookTracker();
