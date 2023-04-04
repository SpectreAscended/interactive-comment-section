import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import DUMMY_DATA from '../store/DUMMY_DATA';
import './commentList.scss';

interface UserData {
  email: string;
  photoURL: string;
  uid: string;
  userName: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  rating: number;
  userData: UserData;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // const data = DUMMY_DATA;
  const { isAuthenticated } = useContext(authContext);

  const commentArr = comments.map(comment => {
    return (
      <li key={comment.id}>
        <CommentCard comment={comment} />
      </li>
    );
  });

  const commentArrCopy = commentArr.slice();
  commentArrCopy.reverse();

  return (
    <section className="comment-list">
      {<ul>{commentArrCopy ? commentArrCopy : <p>No content</p>}</ul>}
      {isAuthenticated && <CommentInput />}
    </section>
  );
};

export default CommentList;
