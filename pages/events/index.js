import Head from 'next/head';

import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import SearchEvents from '../../components/events/SearchEvents';
import { getAllEvents } from '../../helpers/api-utils';

const Events = ({ events }) => {
  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find lots of great events that allow you to evolve!'
        />
      </Head>
      <SearchEvents />
      <EventList events={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
};

export default Events;
