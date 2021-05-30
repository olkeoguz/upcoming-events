const CommentList = ({ comments }) => {
  if (!comments.length) {
    return (
      <h3 className='text-center mx-auto text-lg'>
        No Comments yet! Be the first one to add a comment{' '}
      </h3>
    );
  }

  return (
    <div className='w-full flex justify-center'>
      <ul className='w-1/2'>
        {comments.map((comment) => (
          <li key={comment._id} className='border-b-2 border-gray-400 mb-2'>
            <p className='block text-sm'>{comment.text}</p>
            <div className='text-right mb-2'>
              By <span>{comment.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
