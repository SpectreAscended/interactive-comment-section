import { useState } from 'react';
import { Comment } from '../../types';
import { json } from 'react-router-dom';
import { auth } from '../../firebase';
import './counter.scss';

interface CounterProps {
  defaultCount: number;
  comment: Comment;
}

const baseUrl = import.meta.env.VITE_FIREBASE_DB_HOST;

// TODO Need to figure out a way to only allow one upvote or 1 downvote per post per user.

const Counter: React.FC<CounterProps> = ({ comment }) => {
  const [count, setCount] = useState(comment.rating);

  const updateRating = async (newCount: number) => {
    const url = `${baseUrl}/${comment.id}.json`;
    const options = {
      method: 'PATCH',
      headers: { ContentType: 'application/json' },
      body: JSON.stringify({ rating: count + newCount }),
    };
    try {
      const res = await fetch(url, options);
      if (!res.ok)
        throw json({
          message: 'An error occured with updating comment rating',
          status: 500,
        });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
    updateRating(1);
  };

  const decreaseCount = () => {
    setCount(prevCount => prevCount - 1);
    updateRating(-1);
  };

  return (
    <div className="count">
      <button className="count__btn count__btn--add" onClick={increaseCount}>
        +
      </button>
      <span className="count__display">{count}</span>
      <button
        className="count__btn count__btn--decrease"
        onClick={decreaseCount}
      >
        -
      </button>
    </div>
  );
};

export default Counter;
