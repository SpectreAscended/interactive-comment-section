import { useState, useEffect } from 'react';
import Counter from './UI/Counter';
import './commentCard.scss';

interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
    replies: any;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await import(`${comment.user.image.png}`);
        setImage(res.default);
      } catch (err) {}
    };
    fetchImage();
  }, []);

  return (
    <article className="comment-card">
      <Counter defaultCount={comment.score} />
      <div className="comment-card__content">
        <div className="comment-card__user-data">
          <figure className="comment-card__user-data--img">
            <img src={image} alt={`${comment.user.username} user image`} />
          </figure>
          <span className="comment-card__user-data--username">
            {comment.user.username}
          </span>
          <span className="comment-card__user-data--created-at">
            {comment.createdAt}
          </span>
          <button className="comment-card__reply">Reply</button>
        </div>
        <p className="comment-card__comment-body">{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
