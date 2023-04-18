import { useContext } from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { authContext } from '../context/AuthContext';
import { Comment } from '../types';

interface DashboardProps {
  comments: Comment[];
}

const Dashboard: React.FC<DashboardProps> = ({ comments }) => {
  const { isAuthenticated } = useContext(authContext);

  console.log(comments);

  return (
    <section className="dashboard">
      <CommentList comments={comments} />
      {isAuthenticated && <CommentInput />}
    </section>
  );
};

export default Dashboard;
