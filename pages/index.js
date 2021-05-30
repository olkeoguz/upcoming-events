import Head from 'next/head';

import EventList from '../components/events/EventList';
import { Fragment } from 'react';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsLetterRegistration from '../components/input/NewsLetterRegistration';
import Notification from '../components/UI/Notification';

export default function FeaturedEvents({ featuredEvents }) {
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='NextJs Events' />
        <meta
          name='description'
          content='Find lots of great events that allow you to evolve!'
        />
      </Head>
      <NewsLetterRegistration />
      <EventList events={featuredEvents} />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // re-generate this page in every 30 min
  };
};
