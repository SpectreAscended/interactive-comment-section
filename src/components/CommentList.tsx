import { useContext } from 'react';
import { authContext } from '../context/AuthContext';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import DUMMY_DATA from '../store/DUMMY_DATA';

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

  return (
    <section className="comment-list">
      <ul>
        {comments.map(comment => {
          return (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
        {isAuthenticated && <CommentInput />}
      </ul>
    </section>
  );
};

export default CommentList;
