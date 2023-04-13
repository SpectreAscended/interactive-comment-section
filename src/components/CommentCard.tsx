import Counter from './UI/Counter';
import { Comment } from '../types';
import CommentInput from './CommentInput';
import CommentCardUser from './CommentCardUser';
import { useAppSelector } from '../hooks/stateHooks';
import './commentCard.scss';

interface CommentCardProps {
  comment?: Comment;
  onDelete?: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
  const replyOpen = useAppSelector(state => state.ui.replyOpen);

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
    <div className="comment-card">
      <article className="comment-card__comment">
        <Counter defaultCount={comment.rating} comment={comment} />
        <div className="comment-card__comment-content">
          <CommentCardUser comment={comment} onDelete={onDelete} />
          <p className="comment-card__comment-body">{comment.content}</p>
        </div>
      </article>
      {replyOpen.menuOpen && replyOpen.commentId === comment.id && (
        <div className="comment-card__reply">
          <CommentInput type="reply" />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
