import { useState } from 'react';
import './counter.scss';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decreaseCount = () => {
    setCount(prevCount => prevCount - 1);
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
