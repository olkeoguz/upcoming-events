import { useState, useEffect, useCallback } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import Spinner from '../icons/Spinner';

const Comments = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/comments/${eventId}`);

    const data = await res.json();

    setLoading(false);

    console.log(data);

    setComments(data.comments);
  }, [eventId]);

  return (
    <div>
      <NewComment eventId={eventId} commentAdded={fetchComments} />
      {loading ? (
        <div className=" w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
};

export default Comments;
