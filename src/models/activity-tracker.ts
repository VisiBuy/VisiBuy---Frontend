export interface ActivityTracker {
  trackUserActivity(
    eventName: string,
    event_type: string,
    activityData: Record<string, any>
  ): void;
}
