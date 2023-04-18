import Counter from './UI/Counter';
import { Comment } from '../types';
import CommentInput from './CommentInput';
import CommentCardUser from './CommentCardUser';
import { useAppSelector } from '../hooks/stateHooks';
import './commentCard.scss';

interface CommentCardProps {
  comment?: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const replyInput = useAppSelector(state => state.ui.replyInput);
  const editInput = useAppSelector(state => state.ui.editInput);

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
          <CommentCardUser comment={comment} />
          <p className="comment-card__comment-body">{comment.content}</p>
        </div>
      </article>
      {replyInput.menuOpen && replyInput.commentId === comment.id && (
        <div className="comment-card__reply">
          <CommentInput type="reply" editComment={comment} />
        </div>
      )}
      {editInput.menuOpen && editInput.commentId === comment.id && (
        <div className="comment-card__reply">
          <CommentInput type="edit" editComment={comment} />
        </div>
      )}
    </div>
  );
};

export default CommentCard;
