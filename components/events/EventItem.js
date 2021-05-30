import Image from 'next/image';

import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Button from '../UI/Button';

const EventItem = ({ event }) => {
  const { title, image, date, location, id } = event;

  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li className='flex flex-col md:flex-row m-3 shadow-xl rounded-md  bg-white overflow-hidden md:h-72 w-1/2'>
      <Image
        className='md:h-full w-1/3 mr-3'
        src={'/' + image}
        alt={title}
        width={300}
        height={350}
      />
      {/* <img className='h-full w-1/3 mr-6' src={'/' + image} alt={title} /> */}
      <div className='p-4 flex flex-col justify-center mx-auto flex-shrink-0'>
        <div className='mb-auto flex flex-col space-y-5'>
          <h2 className='text-2xl '>{title}</h2>
          <div className='flex items-center'>
            <DateIcon />
            <time className='font-bold text-gray-400 text-xl p-2'>
              {readableDate}
            </time>
          </div>
          <div className='flex items-center'>
            <AddressIcon />
            <address className='font-light'>
              {formattedAddress}
            </address>
          </div>
        </div>
        <div className='text-right'>
          <Button link={exploreLink}>
            <div className='flex'>
              <span className='mr-2'>Explore Event</span>
              <span>
                <ArrowRightIcon />
              </span>
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
