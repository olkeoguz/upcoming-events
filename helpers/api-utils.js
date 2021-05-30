export async function getAllEvents() {
  const res = await fetch(
    'https://find-coach-27840-default-rtdb.firebaseio.com/events.json'
  );
  const data = await res.json();

  const events = [];

  for (let key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const res = await fetch(
    `https://find-coach-27840-default-rtdb.firebaseio.com/events/${id}.json`
  );
  const data = await res.json();
  return data;
}

export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();

  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

