import Head from 'next/head';
import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import { getFilteredEvents } from '../../helpers/api-utils';

const FilteredEvents = ({ filteredEvents, hasError, year, month }) => {
  const readableDate = new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`All events for ${month}/${year}`} />
    </Head>
  );

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <div className='m-auto text-center'>
          <p className='text-3xl'>Wrong searching credentials...</p>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents.length) {
    return (
      <Fragment>
        {pageHeadData}
        <div className='m-auto text-center'>
          <p className='text-3xl'>No events found...</p>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageHeadData}
      <h3 className='m-auto text-center text-4xl my-4'>{`Events in ${readableDate}`}</h3>
      <EventList events={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEvents;

export const getServerSideProps = async ({ params }) => {
  const filterData = params.slug;
  let [year, month] = filterData;

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hasError: true },
      // notFound:true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      year: numYear,
      month: numMonth,
    },
  };
};
