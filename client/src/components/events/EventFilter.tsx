"use client";

import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { EventCard } from '@/components/events';
import { InterfaceEvent } from '@/types/event';

// EventFilter Component
const EventFilter = ({ allEvents }: { allEvents: InterfaceEvent[] }) => {
  const [events, setEvents] = useState(allEvents);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
  });

  const uniqueTitles = Array.from(new Set(allEvents.map(event => event.title)));
  const uniqueLocations = Array.from(new Set(allEvents.map(event => event.location)));
  const uniqueTypes = Array.from(new Set(allEvents.map(event => event.type)));

  useEffect(() => {
    const filteredEvents = allEvents.filter(event => {
      const titleMatch = !filters.title || event.title === filters.title;
      const locationMatch = !filters.location || event.location === filters.location;
      const typeMatch = !filters.type || event.type === filters.type;
      return titleMatch && locationMatch && typeMatch;
    });

    setEvents(filteredEvents);
  }, [filters, allEvents]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({ title: '', location: '', type: '' });
  };

  return (
    <>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-6">

        {/* Title Filter */}
        <Select
          value={filters.title}
          onValueChange={(value) => handleFilterChange('title', value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Title" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTitles.map(title => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange('location', value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map(location => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Event List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}

export default EventFilter
