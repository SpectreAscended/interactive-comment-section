import { Form, useSubmit } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../types';
import Modal from './UI/Modal';
import { uiActions } from '../store/uiSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/stateHooks';
import { auth } from '../firebase';
import './commentCardUser.scss';

interface CommentCardUserProps {
  comment: Comment;
}

//  BUGBUGBUGLECBUGTODO  Delete is not functioning properly. It just refers to the first form rendered to the page regardless of what is clicked.  Issue either arose when I split it into its own component, or when I started to get the modal involved. Probably try disabling the modal and see if that changes the behavior, if not refactor this code back into its original place.

//LEC Clue --- The problem goes away when modal is disabled.  Figure out a different way to handle this.

const CommentCardUser: React.FC<CommentCardUserProps> = ({ comment }) => {
  const userData = auth.currentUser;
  const submit = useSubmit();
  const dispatch = useDispatch();
  const modalOpen = useAppSelector(state => state.ui.modalOpen);

  //TODO Move this to its own file, and make more customizable, and more advanced ei: Today, Yesterday, 3 days ago etc...
  const formatDate = (inputDate: Date) => {
    const currentDate = new Date(inputDate);
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const userComment = userData && userData.uid === comment?.userData.uid;

  const commentCreatedAt = formatDate(comment.createdAt);

  const deleteComment = () => {
    if (!userData) return;

    let formData = new FormData();

    formData.append('comment-id', comment.id);
    formData.append('comment-uid', comment.userData.uid);
    submit(formData, { method: 'delete' });
    dispatch(uiActions.closeModal());
  };

  const deleteCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment) return;
    dispatch(uiActions.openModal());
  };

  return (
    <>
      {modalOpen && (
        <Modal
          title="Delete Post"
          message="Are you sure?"
          onPrimary={() => {
            deleteComment();
          }}
          onSecondary={() => {
            dispatch(uiActions.closeModal());
          }}
        />
      )}
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
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginRight: '.5rem' }}
              />
              Delete
            </button>
          )}
          <button className="user-data__reply">
            <FontAwesomeIcon icon={faReply} style={{ marginRight: '.5rem' }} />
            Reply
          </button>
        </Form>
      </div>
    </>
  );
};

export default CommentCardUser;
