import { useState, useEffect } from 'react';
import Counter from './UI/Counter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import './commentCard.scss';

interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    createdAt: Date;
    rating: number;
    userData: {
      userName: string;
      photoURL: string;
      email: string;
      uid: string;
    };
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await import(`${comment.userData.photoURL}`);
        setImage(res.default);
      } catch (err) {}
    };
    fetchImage();
  }, []);

  const formatDate = (inputDate: Date) => {
    const currentDate = new Date(inputDate);
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
          <span className="comment-card__user-data--created-at">
            {commentCreatedAt}
          </span>
          <button className="comment-card__reply">
            <FontAwesomeIcon icon={faReply} style={{ marginRight: '.5rem' }} />
            Reply
          </button>
        </div>
        <p className="comment-card__comment-body">{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
