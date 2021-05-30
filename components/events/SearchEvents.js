import { useRef } from 'react';
import { useRouter } from 'next/router';

import Button from '../UI/Button';

const SearchEvents = () => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    router.push(`/events/${selectedYear}/${selectedMonth}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='flex  justify-center space-x-12 items-center p-4 '>
        <div>
          <label htmlFor='year'>Year</label>
          <select
            id='year'
            ref={yearInputRef}
            className='bg-gray-200 border-black border-2 ml-2 rounded'
          >
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div>
          <label htmlFor='month'>Month</label>
          <select
            id='month'
            ref={monthInputRef}
            className='bg-gray-200 border-black border-2 ml-2 rounded'
          >
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
        <Button>Find Events</Button>
      </div>
    </form>
  );
};

export default SearchEvents;
