import Counter from './UI/Counter';
import { Comment, CommentDeleteData } from '../types';
import CommentCardUser from './CommentCardUser';
import './commentCard.scss';

interface CommentCardProps {
  comment?: Comment;
  onDelete?: (a: CommentDeleteData) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
  if (!comment) {
    return (
      <article className="comment-card">
        <div className="comment-card__content">
          <h3 className="comment-card__no-items">No posts available...</h3>
        </div>
      </article>
    );
  }

  return (
    <article className="comment-card">
      <Counter defaultCount={comment.rating} comment={comment} />
      <div className="comment-card__content">
        <CommentCardUser comment={comment} onDelete={onDelete} />
        <p className="comment-card__comment-body">{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
