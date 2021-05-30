import Link from 'next/link';

const MainHeader = () => {
  return (
    <header className='bg-gray-900 text-white p-4 flex justify-between items-center'>
      <div className='ml-10'>
        <Link href='/'>
          <span className='text-2xl font-semibold cursor-pointer'>NextEvents</span>
        </Link>
      </div>
      <nav className='mr-10'>
        <ul>
          <li>
            <Link href='/events'>
              <span className='text-xl cursor-pointer'>Browse all Events</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
