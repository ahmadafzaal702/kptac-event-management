"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { EventCard } from "@/components/events";
import { NotFound } from "../shared";
import { InterfaceEvent } from "@/types/event";

// EventFilter Component
const EventFilter = ({ allEvents }: { allEvents: InterfaceEvent[] }) => {
  const [events, setEvents] = useState(allEvents);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    status: "",
  });

  const uniqueLocations = Array.from(
    new Set(allEvents.map((event) => event.location))
  );
  const uniqueTypes = Array.from(new Set(allEvents.map((event) => event.type)));

  useEffect(() => {
    const currentDate = new Date();

    const filteredEvents = allEvents.filter((event) => {
      // Title filter
      const titleMatch =
        !filters.title ||
        event.title.toLowerCase().includes(filters.title.toLowerCase());

      // Location filter
      const locationMatch =
        !filters.location || event.location === filters.location;

      // Type filter
      const typeMatch = !filters.type || event.type === filters.type;

      // Status filter
      const startDate = new Date(event.starts_at);
      const expireDate = new Date(event.expires_at);

      let statusMatch = true;
      if (filters.status) {
        if (filters.status === "upcoming") {
          statusMatch = currentDate < startDate;
        } else if (filters.status === "ongoing") {
          statusMatch = currentDate >= startDate && currentDate <= expireDate;
        } else if (filters.status === "expired") {
          statusMatch = currentDate > expireDate;
        }
      }

      return titleMatch && locationMatch && typeMatch && statusMatch;
    });

    setEvents(filteredEvents);
  }, [filters, allEvents]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      title: "",
      location: "",
      type: "",
      status: "",
    });
  };

  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-6">
        {/* Title Filter */}
        <Input
          placeholder="Search by title..."
          value={filters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          className="w-[300px]"
        />

        {/* Status Filter */}
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Filter */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="w-full flex items-center justify-center py-12">
          <NotFound text="No events found" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  );
};

export default EventFilter;
