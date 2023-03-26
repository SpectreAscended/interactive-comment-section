import userImage from '../assets/avatars/image-juliusomo.png';
import Button from './UI/Button';
import './commentInput.scss';

const CommentInput: React.FC = () => {
  return (
    <form className="comment-input">
      <figure className="comment-input__user-img">
        <img src={userImage} alt="user img" />
      </figure>
      <div className="comment-input__content">
        <textarea
          name="comment-input"
          id="comment-input"
          className="comment-input__input"
          rows={3}
        />
        <Button onClick={() => {}}>Send</Button>
      </div>
    </form>
  );
};

export default CommentInput;
