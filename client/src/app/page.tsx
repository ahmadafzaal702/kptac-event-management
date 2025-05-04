// ui imports
import { EventCard } from "@/components/events";
import { NotFound } from "@/components/shared";

// types & utils
import { getAllEvents } from "@/utils/utils";

// Home FC
export default async function Home() {
  const events = await getAllEvents(
    "https://68148b33225ff1af16292eee.mockapi.io/api/v1/events",
    60
  );

  // Home FC return
  return (
    <main className="w-full min-h-screen overflow-hidden px-12 py-12">
      <div className="text-center pb-4">
        <h1 className="text-4xl font-bold tracking-tight">Popular Events</h1>
        <p className="text-muted-foreground mt-2">
          Discover upcoming, ongoing, and expired events.
        </p>
      </div>

      {/* events list */}
      {Array.isArray(events) && events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <NotFound text="Event Not Found" />
      )}
    </main>
  );
}
