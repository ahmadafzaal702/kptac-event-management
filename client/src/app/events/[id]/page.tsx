import { notFound } from "next/navigation";
import { EventTiming, EventStatus } from "@/components/events";

// types & utils
import { InterfaceEvent } from "@/types/event";
import { getAllEvents } from "@/utils/utils";

// Fetch single event
async function getEvent(id: number): Promise<InterfaceEvent | undefined> {
  const events = await getAllEvents(
    "https://68148b33225ff1af16292eee.mockapi.io/api/v1/events",
    60
  );
  return events.find((event) => event.id === id);
}

// Generate static paths at build time
export async function generateStaticParams() {
  const events = await getAllEvents(
    "https://68148b33225ff1af16292eee.mockapi.io/api/v1/events",
    60
  );
  return events.map((event) => ({ id: event.id.toString() }));
}

interface IParams {
  params: Promise<{ id: string }>;
}

const EventDetailPage = async ({ params }: IParams) => {
  const { id } = await params;
  const event = await getEvent(Number(id));

  if (!event) {
    notFound(); // Will show the not-found page
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
            {/* <EventImage imgURL={event.image_url} title={event.title} /> */}
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-auto object-cover"
            />
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
