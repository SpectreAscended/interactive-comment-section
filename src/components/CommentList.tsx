import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import DUMMY_DATA from '../store/DUMMY_DATA';

const CommentList: React.FC = () => {
  const data = DUMMY_DATA;

  return (
    <section className="comment-list">
      <ul>
        {data.map(comment => {
          return (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
        <CommentInput />
      </ul>
    </section>
  );
};

export default CommentList;
