"use client";

// react/next imports
import { useState, useEffect } from "react";

// ui
import { Badge } from "../ui/badge";

// types & utils
import {
  InterfaceEvent,
  EventStatType,
  EventBadgeType,
  EventCounterInterface,
} from "@/types/event";
import { getTimeLeft } from "@/utils/utils";

const EventStatus = ({ event }: { event: InterfaceEvent }) => {
  const [eventStatus, setEventStatus] = useState<EventStatType>("Upcoming");
  const [badgeVariant, setBadgeVariant] = useState<EventBadgeType>("default");
  const [eventTimeLeft, setEventTimeLeft] =
    useState<EventCounterInterface | null>(null);

  // get status and remaining time
  useEffect(() => {
    const getStatusAndTime = () => {
      const currentDate = new Date();
      const startDate = new Date(event.starts_at);
      const expireDate = new Date(event.expires_at);

      if (currentDate < startDate) {
        setEventStatus("Upcoming");
        setEventTimeLeft(getTimeLeft(event.starts_at));
        setBadgeVariant("secondary");
      } else if (currentDate > expireDate) {
        setEventStatus("Expired");
        setEventTimeLeft(null);
        setBadgeVariant("destructive");
      } else {
        setEventStatus("Ongoing");
        setEventTimeLeft(getTimeLeft(event.expires_at));
      }
    };

    getStatusAndTime();

    // update every minutes
    const interval = setInterval(getStatusAndTime, 60000);

    return () => clearInterval(interval);
  }, [event.starts_at, event.expires_at]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Badge variant={badgeVariant}>{eventStatus}</Badge>

        <div className="text-sm">
          {eventStatus === "Upcoming" && eventTimeLeft && (
            <Badge variant={badgeVariant} className="text-blue-600">
              Starts in: {eventTimeLeft.days}d {eventTimeLeft.hours}h{" "}
              {eventTimeLeft.minutes}m
            </Badge>
          )}

          {eventStatus === "Ongoing" && eventTimeLeft && (
            <Badge variant={badgeVariant}>
              Ends in: {eventTimeLeft.days}d {eventTimeLeft.hours}h{" "}
              {eventTimeLeft.minutes}m
            </Badge>
          )}

          {/* {eventStatus === "Expired" && (
            <p className="text-gray-500">Event ended</p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default EventStatus;
