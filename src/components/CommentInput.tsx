import { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { Form, useSubmit, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import './commentInput.scss';

const CommentInput: React.FC = () => {
  const { userData } = useContext(authContext);
  const navigate = useNavigate();
  const submit = useSubmit();
  const [userImg, setUserImg] = useState<any>(userData.userImage);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (userData.userImage) {
      setUserImg(userData.userImage);
    }
  }, [userData.userImage]);

  const inputHander = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const submitCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) {
      navigate('/login');
      return;
    }

    let formData = new FormData();

    if (inputValue.trim() === '') {
      return;
    }

    formData.append('comment-input', inputValue);

    submit(formData, { method: 'post' });
    setInputValue('');
  };

  return (
    <Form
      className="comment-input"
      method="post"
      onSubmit={submitCommentHandler}
    >
      <figure className="comment-input__user-img">
        {userImg ? <img src={userImg} alt="user img" /> : ''}
      </figure>
      <div className="comment-input__content">
        <textarea
          name="comment-input"
          id="comment-input"
          className="comment-input__input"
          rows={3}
          value={inputValue}
          onChange={inputHander}
        />
        <Button type="submit">Send</Button>
      </div>
    </Form>
  );
};

export default CommentInput;
