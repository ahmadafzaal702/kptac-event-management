import React from "react";
import { EventTimingInterface } from "@/types/event";

// EventTiming Component
const EventTiming = ({ startDate, expireDate }: EventTimingInterface) => {
  const eventStartDate = new Date(startDate);
  const eventEndDate = new Date(expireDate);
  return (
    <div>
      <h3 className="font-medium mb-2">Date & Time</h3>
      <p>
        {eventStartDate.toLocaleDateString()} -{" "}
        {eventEndDate.toLocaleDateString()}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {eventStartDate.toLocaleTimeString()} to{" "}
        {eventEndDate.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default EventTiming;
