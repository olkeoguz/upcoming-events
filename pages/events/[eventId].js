import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';

import { Fragment, useState,useRef,useEffect } from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import DateIcon from '../../components/icons/DateIcon';
import AddressIcon from '../../components/icons/AddressIcon';
import Comments from '../../components/input/Comments';

const EventDetails = ({ event }) => {
  const [showComments, setShowComments] = useState(false);

  const divRef = useRef(null);

  const router = useRouter();

  const {eventId} = router.query;

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  if (!event) {
    return (
      <div className='m-auto text-center'>
        <p className='text-3xl'>Loading...</p>
      </div>
    );
  }

  const readableDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = event.location.replace(', ', '\n');

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <section className='w-full h-64 bg-gradient-to-r from-green-500 to-blue-300 text-white flex justify-center '>
        <h2 className='md:text-6xl text-3xl mt-10 text-shadow font-semibold'>
          {event.title}
        </h2>
      </section>
      <section className='relative -top-32'>
        <div className='w-full flex justify-center'>
          <div className='flex flex-col md:flex-row bg-gray-800 text-white rounded-xl p-6 shadow-xl space-x-10 items-center'>
            <div className='rounded-full border-white border-4'>
            <Image
              className='w-72 h-72 rounded-full'
              src={'/' + event.image}
              alt={event.title}
              width={250}
              height={250}
            />
            </div>
            <div>
              <DateIcon />
              <time className='block my-4'>{readableDate}</time>
              <AddressIcon />
              <address className='font-light text-lg block my-4 '>
                {formattedAddress}
              </address>
            </div>
          </div>
        </div>
        <div className='w-3/4 text-center mx-auto my-6'>
          <p className='text-2xl'>{event.description}</p>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={() => {
              setShowComments(!showComments);
            }}
            className='bg-green-400 p-2 border-2 rounded-md text-white hover:bg-gray-200 hover:text-green-400'
          >
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        </div>
        {showComments && <Comments eventId={eventId} />}
        <div ref={divRef} />
      </section>
    </Fragment>
  );
};

export const getStaticProps = async ({ params }) => {
  const { eventId } = params;
  const event = await getEventById(eventId);

  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
  // paths: [{ params: { eventId: 'e1' } }],
};

export default EventDetails;
