import CommentCard from './components/CommentCard';
import CommentInput from './components/CommentInput';
import DUMMY_DATA from './store/DUMMY_DATA';

const App: React.FC = () => {
  const data = DUMMY_DATA;

  return (
    <main>
      <ul>
        {data.map(comment => {
          return (
            <li key={comment.id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </ul>
      <CommentInput />
    </main>
  );
};

export default App;
