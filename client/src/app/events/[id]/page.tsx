import { notFound } from "next/navigation";
import { EventTiming, EventStatus, EventImage } from "@/components/events";
import { InterfaceEvent, EventDetailPageProps } from "@/types/event";
import { getAllEvents } from "@/utils/utils";
import { API_URL, VALIDATE_DURATION } from '@/utils/constants';

// Fetch single event by ID
async function getEvent(id: number): Promise<InterfaceEvent | undefined> {
  const events = await getAllEvents(API_URL, VALIDATE_DURATION);
  return events.find((event) => event.id === id);
}

// Generate static paths at build time
export async function generateStaticParams() {
  const events = await getAllEvents(API_URL, VALIDATE_DURATION);
  return events.map((event) => ({ id: event.id.toString() }));
}

// Event Detail Page Component
const EventDetailPage = async ({ params }: EventDetailPageProps) => {
  const { id } = await params;
  const event = await getEvent(Number(id));

  if (!event) {
    notFound();
  }

  return (
    <>
      <main className="w-full min-h-screen overflow-hidden px-12 py-12">
        <div className="mx-auto">
          {/* Event Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {event.location}
                </p>
              </div>
            </div>

            {/* event status with countdown */}
            <div className="pt-2">
              <EventStatus event={event} />
            </div>
          </div>

          {/* Event Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <EventImage imgURL={event.image_url} title={event.title} variant='page' />
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Event Description</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Event Type</h3>
                <p>{event.type}</p>
              </div>

              <div className="border rounded-lg p-4">
                {/* event timing */}
                <EventTiming
                  startDate={event.starts_at}
                  expireDate={event.expires_at}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EventDetailPage;
