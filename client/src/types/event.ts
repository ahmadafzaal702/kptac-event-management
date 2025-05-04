export interface InterfaceEvent {
    id: number,
    title: string,
    location: string,
    description: string,
    type: string,
    starts_at: string,
    expires_at: string,
    image_url: string
}

export type EventStatType = 'Upcoming' | 'Ongoing' | 'Expired';
export type EventBadgeType = 'secondary' | 'default' | 'destructive';

export interface EventCounterInterface {
    days: number,
    hours: number,
    minutes: number,
}

export interface EventTimingInterface {
    startDate: string,
    expireDate: string,
}

export interface InterfaceEventImage {
    imgURL: string,
    title: string,
    height?: string,
}