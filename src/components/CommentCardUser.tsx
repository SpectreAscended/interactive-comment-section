import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '../types';
import { uiActions } from '../store/uiSlice';
import formatDate from '../utilities/formatDate';
import { useDispatch } from 'react-redux';
import { CommentDeleteData } from '../types';
import { auth, storage } from '../firebase';
import { list, getDownloadURL, ref } from 'firebase/storage';
import './commentCardUser.scss';

interface CommentCardUserProps {
  comment: Comment;
  onDelete?: (a: CommentDeleteData) => void;
}

//  BUGBUGBUGLECBUGTODO  Delete is not functioning properly. It just refers to the first form rendered to the page regardless of what is clicked.  Issue either arose when I split it into its own component, or when I started to get the modal involved. Probably try disabling the modal and see if that changes the behavior, if not refactor this code back into its original place.

//LEC Clue --- The problem goes away when modal is disabled.  Figure out a different way to handle this.

const CommentCardUser: React.FC<CommentCardUserProps> = ({
  comment,
  onDelete,
}) => {
  const userData = auth.currentUser;
  const dispatch = useDispatch();

  const [userImg, setUserImg] = useState<string | null>(null);

  const userComment = userData && userData.uid === comment?.userData.uid;

  const commentCreatedAt = formatDate(comment.createdAt);

  // This makes too many requests.  Figure out a way to stop that.
  const loadUserImg = async () => {
    const imageListRef = ref(
      storage,
      `users/${comment.userData.uid}/userImage/`
    );

    try {
      const imageList = await list(imageListRef);
      const imageUrl = await getDownloadURL(imageList.items[0]);

      if (imageUrl) {
        setUserImg(imageUrl);
      } else setUserImg(null);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadUserImg();
  }, [loadUserImg]);

  return (
    <>
      <div className="user-data">
        <figure className="user-data__img">
          {userImg ? (
            <img
              src={userImg}
              alt={`${comment.userData.userName} user image`}
            />
          ) : null}
        </figure>
        <span className="user-data__username">{comment.userData.userName}</span>
        {userComment && <span className="user-data__users-post">You</span>}
        <span className="user-data__created-at">{commentCreatedAt}</span>
        <div className="user-data__controls">
          {userComment && (
            <button
              className="user-data__delete"
              type="button"
              onClick={() => {
                dispatch(uiActions.openModal());
                dispatch(
                  uiActions.setModalData({
                    commentId: comment.id,
                    commentUid: comment.userData.uid,
                  })
                );
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginRight: '.5rem' }}
              />
              Delete
            </button>
          )}
        </div>
        <button className="user-data__reply">
          <FontAwesomeIcon icon={faReply} style={{ marginRight: '.5rem' }} />
          Reply
        </button>
      </div>
    </>
  );
};

export default CommentCardUser;
