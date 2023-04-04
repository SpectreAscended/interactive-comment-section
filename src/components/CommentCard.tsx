import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import Counter from './UI/Counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../types';

import './commentCard.scss';

interface CommentCardProps {
  comment?: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { userData } = useContext(authContext);
  const userComment = userData.uid === comment?.userData.uid;

  //TODO Move this to its own file, and make more customizable
  const formatDate = (inputDate: Date) => {
    const currentDate = new Date(inputDate);
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!comment) {
    return (
      <article className="comment-card">
        <div className="comment-card__content">
          <h3 className="comment-card__no-items">No posts available...</h3>
        </div>
      </article>
    );
  }
  const commentCreatedAt = formatDate(comment.createdAt);

  return (
    <article className="comment-card">
      <Counter defaultCount={comment.rating} />
      <div className="comment-card__content">
        <div className="comment-card__user-data">
          <figure className="comment-card__user-data--img">
            <img
              src={comment.userData.photoURL}
              alt={`${comment.userData.userName} user image`}
            />
          </figure>
          <span className="comment-card__user-data--username">
            {comment.userData.userName}
          </span>
          {userComment && (
            <span className="comment-card__user-data--users-post">You</span>
          )}
          <span className="comment-card__user-data--created-at">
            {commentCreatedAt}
          </span>
          <div className="comment-card__actions">
            {userComment && (
              <button className="comment-card__delete">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ marginRight: '.5rem' }}
                />
                Delete
              </button>
            )}
            <button className="comment-card__reply">
              <FontAwesomeIcon
                icon={faReply}
                style={{ marginRight: '.5rem' }}
              />
              Reply
            </button>
          </div>
        </div>
        <p className="comment-card__comment-body">{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
