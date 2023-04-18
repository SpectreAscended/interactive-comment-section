import { useContext, useEffect, useState } from 'react';
import { authContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import { Form, useSubmit, useNavigate } from 'react-router-dom';
import { Comment } from '../types/index';
import Button from './UI/Button';
import './commentInput.scss';

interface CommentInputProps {
  type?: 'reply' | 'post' | 'edit';
  editComment?: Comment;
}

const CommentInput: React.FC<CommentInputProps> = ({
  type = 'post',
  editComment,
}) => {
  const { userData } = useContext(authContext);
  const navigate = useNavigate();
  const submit = useSubmit();
  const [userImg, setUserImg] = useState<any>(userData.userImage);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.userImage) {
      setUserImg(userData.userImage);
    }

    if (type === 'edit' && editComment) {
      setInputValue(editComment.content);
    }
  }, [userData.userImage, editComment]);

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

    if (type === 'post') {
      submit(formData, { method: 'post' });
    } else if (type === 'edit') {
      formData.append('comment-id', editComment!.id);
      submit(formData, { method: 'patch' });
      dispatch(uiActions.closeEdit());
    } else if (type === 'reply') {
      formData.append('comment-id', editComment!.id);
      formData.append('type-reply', 'reply');
      submit(formData, { method: 'post' });
      dispatch(uiActions.closeReply());
    }
    setInputValue('');
  };

  return (
    <Form className="comment-input" onSubmit={submitCommentHandler}>
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
        <Button type="submit">
          {type === 'reply' ? 'Reply' : type === 'edit' ? 'Edit' : 'Send'}
        </Button>
      </div>
    </Form>
  );
};

export default CommentInput;
