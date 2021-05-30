import Link from 'next/link';

const Button = ({ children, link, clicked }) => {
  if (link) {
    return (
      <button className='text-blue-400 p-3 rounded-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-white'>
        <Link href={link}>{children}</Link>
      </button>
    );
  }

  return (
    <button
      onClick={clicked}
      className='text-blue-400 p-1 border-b-2 border-blue-400 hover:text-black'
    >
      {children}
    </button>
  );
};

export default Button;
