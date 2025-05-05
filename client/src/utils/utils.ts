import { InterfaceEvent } from "@/types/event";

export const getAllEvents = async (url: string, validateTime: number): Promise<InterfaceEvent[]> => {
  try {
    const res = await fetch(url,
      {
        next: { revalidate: validateTime },
      }
    );

    return await res.json();
  } catch (error) {
    console.log("Failed to fetch events:", error);
    return [];
  }
};

export const getTimeLeft = (targetDate: string) => {
  const currentDate = new Date();
  const target = new Date(targetDate);
  const difference = target.getTime() - currentDate.getTime();

  // if no difference
  if (difference <= 0) return null;

  // calculate the difference and return
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
}