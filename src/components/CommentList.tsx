import CommentCard from './CommentCard';
import { Comment } from '../types';
import './commentList.scss';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const commentListArr = comments.map(comment => {
    return (
      <li key={comment.id}>
        <CommentCard comment={comment} />
      </li>
    );
  });

  const commentListItems = commentListArr.slice();
  commentListItems.reverse();
  // const commentListItems = null;

  return (
    <section className="comment-list">
      {<ul>{commentListItems ? commentListItems : <CommentCard />}</ul>}
    </section>
  );
};

export default CommentList;
