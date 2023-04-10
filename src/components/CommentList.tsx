import { useState } from 'react';
import CommentCard from './CommentCard';
import { Comment } from '../types';
import { useSubmit } from 'react-router-dom';
import Modal from './UI/Modal';
import { useAppSelector } from '../hooks/stateHooks';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import './commentList.scss';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [error, setError] = useState<string | null>(null);
  const submit = useSubmit();
  const dispatch = useDispatch();
  const modalOpen = useAppSelector(state => state.ui.modalOpen);
  const modalData = useAppSelector(state => state.ui.modalData);

  const deleteComment = () => {
    const formData = new FormData();
    if (!modalData.commentUid) {
      setError('Could not delete comment');
      dispatch(uiActions.closeModal());
      return;
    }

    formData.append('comment-id', modalData.commentId);
    formData.append('comment-uid', modalData.commentUid);

    submit(formData, { method: 'delete' });
    dispatch(uiActions.closeModal());
    dispatch(uiActions.resetModalData());
  };

  const commentListArr = comments.map(comment => {
    return (
      <li key={comment.id}>
        <CommentCard comment={comment} onDelete={deleteComment} />
      </li>
    );
  });

  const commentListItems = commentListArr.slice();
  commentListItems.reverse();

  return (
    <section className="comment-list">
      {modalOpen && (
        <Modal
          title="Delete comment"
          message="Are you sure?"
          onPrimary={deleteComment}
          onSecondary={() => {
            dispatch(uiActions.closeModal());
          }}
        />
      )}
      {error && (
        <p className="error-message" style={{ maxWidth: '30rem' }}>
          Could not delete comment
        </p>
      )}
      {<ul>{commentListItems ? commentListItems : <CommentCard />}</ul>}
    </section>
  );
};

export default CommentList;
