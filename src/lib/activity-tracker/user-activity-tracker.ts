import { ActivityTracker } from "@/models/activity-tracker";

export class UserActivityTracker {
    private trackers: ActivityTracker[];

    constructor(trackers: ActivityTracker[]) {
        this.trackers = trackers;
    }

    trackActivity(eventName: string,
        event_type: string,
        eventData: Record<string, any>): void {
        this.trackers.forEach(tracker => {
            tracker.trackUserActivity(eventName,event_type, eventData);
        });
    }
}