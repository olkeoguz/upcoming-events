import { useRef, useState, useContext } from 'react';
import NotificationContext from '../../store/notification.context';

const NewComment = ({ eventId, commentAdded }) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const textRef = useRef();

  const [formIsValid, setFormIsValid] = useState(true);

  const { showNotification } = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormIsValid(true);

    if (
      !emailRef.current.value ||
      emailRef.current.value.trim() === '' ||
      !emailRef.current.value.includes('@') ||
      !nameRef.current.value ||
      nameRef.current.value.trim() === '' ||
      !textRef.current.value ||
      textRef.current.value.trim() === ''
    ) {
      setFormIsValid(false);
      return;
    }

    const comment = {
      email: emailRef.current.value,
      name: nameRef.current.value,
      text: textRef.current.value,
    };

    try {
      showNotification({
        title: 'Submitting...',
        message: 'Adding your comment',
        status: 'pending',
      });

      const res = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong!');
      }

      showNotification({
        title: 'Success',
        message: 'Comment is successfully added.',
        status: 'success',
      });

      await commentAdded();
    } catch (error) {
      showNotification({
        title: 'Error!.',
        message: error.message,
        status: 'error',
      });
    }

    emailRef.current.value = '';
    nameRef.current.value = '';
    textRef.current.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex justify-center items-center my-4'
    >
      <div className='flex flex-col bg-green-400 md:w-1/2 p-4 '>
        <div className='flex mb-2 '>
          <div className='w-full mr-4'>
            <label className='block mb-2' htmlFor='email'>
              Your Email
            </label>
            <input
              ref={emailRef}
              className='w-full p-2'
              type='email'
              id='email'
            />
          </div>
          <div className='w-full'>
            <label className='block  mb-2' htmlFor='name'>
              Your name
            </label>
            <input ref={nameRef} className='w-full p-2' type='name' id='name' />
          </div>
        </div>
        <div>
          <label className='mb-2 block' htmlFor='comment'>
            Your comment
          </label>
          <textarea
            ref={textRef}
            className='w-full p-2'
            rows='3'
            id='comment'
          />
        </div>
        {!formIsValid && (
          <p className='text-red-900 text-center'>Invalid Credentials!!</p>
        )}
        <div className='text-center my-2'>
          <button
            type='submit'
            className=' p-2 border-2 rounded-md bg-white hover:bg-black hover:text-white'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewComment;
