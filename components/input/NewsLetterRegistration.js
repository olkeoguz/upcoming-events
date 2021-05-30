import { Fragment, useRef, useState, useContext } from 'react';
import NotificationContext from '../../store/notification.context';
import Button from '../UI/Button';

const NewsLetterRegistration = () => {
  const emailRef = useRef();

  const { showNotification } =
    useContext(NotificationContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    showNotification({
      title: 'Signing Up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: emailRef.current.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ||'Something went wrong!');
      }

      showNotification({
        title: 'Success!.',
        message: 'Successfully registered for newsletter',
        status: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Error!.',
        message: error.message,
        status: 'error',
      });
    }

    emailRef.current.value = '';
  };

  return (
    <div className='flex flex-col items-center my-6 space-y-4'>
      <h4 className='text-3xl font-bold'>Sign up to stay updated!</h4>

      <form onSubmit={handleSubmit}>
        <Fragment>
          <input
            ref={emailRef}
            className='p-1 border-black border-2 rounded-md mr-4 focus:bg-gray-200'
            type='email'
            placeholder='Your Email'
          />
          <Button type='submit'>Register</Button>
        </Fragment>
      </form>
    </div>
  );
};

export default NewsLetterRegistration;
