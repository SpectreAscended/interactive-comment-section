import { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
// import userImage from '../assets/avatars/image-juliusomo.png';
import Button from './UI/Button';
import './commentInput.scss';

const CommentInput: React.FC = () => {
  const { userData } = useContext(authContext);
  const [userImg, setUserImg] = useState<any>(userData.userImage);

  useEffect(() => {
    if (userData.userImage) {
      setUserImg(userData.userImage);
    }
  }, [userData.userImage]);

  return (
    <form className="comment-input">
      <figure className="comment-input__user-img">
        {userImg ? <img src={userImg} alt="user img" /> : ''}
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
