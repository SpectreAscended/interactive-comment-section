import { useContext } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../types';
import { authContext } from '../context/AuthContext';
import './commentCardUser.scss';

interface CommentCardUserProps {
  comment: Comment;
}

const CommentCardUser: React.FC<CommentCardUserProps> = ({ comment }) => {
  const { userData } = useContext(authContext);
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

  const userComment = userData.uid === comment?.userData.uid;

  const commentCreatedAt = formatDate(comment.createdAt);

  const deleteCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment) return;
    let formData = new FormData();
    formData.append('comment-id', comment.id);
    formData.append('comment-uid', comment.userData.uid);
    submit(formData, { method: 'delete' });
  };

  return (
    <div className="user-data">
      <figure className="user-data__img">
        <img
          src={comment.userData.photoURL}
          alt={`${comment.userData.userName} user image`}
        />
      </figure>
      <span className="user-data__username">{comment.userData.userName}</span>
      {userComment && <span className="user-data__users-post">You</span>}
      <span className="user-data__created-at">{commentCreatedAt}</span>

      <Form onSubmit={deleteCommentHandler} className="user-data__actions">
        {userComment && (
          <button className="user-data__delete" type="submit">
            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '.5rem' }} />
            Delete
          </button>
        )}
        <button className="user-data__reply">
          <FontAwesomeIcon icon={faReply} style={{ marginRight: '.5rem' }} />
          Reply
        </button>
      </Form>
    </div>
  );
};

export default CommentCardUser;
