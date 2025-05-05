"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventStatus, EventTiming, EventImage } from "@/components/events";
import { InterfaceEvent } from "@/types/event";

// EventCard Component
const EventCard = ({ event }: { event: InterfaceEvent }) => {
  const router = useRouter();

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow py-0"
        onClick={() => router.push(`/events/${event.id}`)}
      >
        <CardHeader className="p-0">
          <div className="relative h-48">
            <EventImage imgURL={event.image_url} title={event.title} variant='card' />
          </div>
        </CardHeader>
        <CardContent className="px-4">
          {/* event status with countdown */}
          <div className="pb-2">
            <EventStatus event={event} />
          </div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
          <Badge variant="outline" className="mt-2">
            {event.type}
          </Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="text-sm">
            {/* event timing */}
            <EventTiming
              startDate={event.starts_at}
              expireDate={event.expires_at}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default EventCard;
