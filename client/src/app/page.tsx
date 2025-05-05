import { EventFilter } from "@/components/events";
import { getAllEvents } from "@/utils/utils";
import { API_URL, VALIDATE_DURATION } from '@/utils/constants';

// Home Page Component
export default async function Home() {
  const events = await getAllEvents(API_URL, VALIDATE_DURATION);

  return (
    <main className="w-full min-h-screen overflow-hidden px-12 py-12">
      <div className="text-center pb-4">
        <h1 className="text-4xl font-bold tracking-tight">Popular Events</h1>
        <p className="text-muted-foreground mt-2">
          Discover upcoming, ongoing, and expired events.
        </p>
      </div>

      {/* event filter component */}
      <EventFilter
        allEvents={events}
      />
    </main>
  );
}
