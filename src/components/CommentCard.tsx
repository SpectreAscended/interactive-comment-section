import { useContext } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import Counter from './UI/Counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../types';
import { deleteComment } from '../utilities/postActions';
import './commentCard.scss';

interface CommentCardProps {
  comment?: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const { userData } = useContext(authContext);
  const userComment = userData.uid === comment?.userData.uid;
  const submit = useSubmit();

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

  const deleteCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment) return;
    let formData = new FormData();
    formData.append('comment-id', comment.id);
    formData.append('comment-uid', comment.userData.uid);
    submit(formData, { method: 'delete' });
    // await deleteComment(comment.id, comment.userData.uid, userData);
  };

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
              <Form onSubmit={deleteCommentHandler}>
                <button className="comment-card__delete" type="submit">
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ marginRight: '.5rem' }}
                  />
                  Delete
                </button>
              </Form>
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
