import EventItem from './EventItem';

const EventList = ({ events }) => {
  return (
    <ul className="flex flex-col items-center">
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
