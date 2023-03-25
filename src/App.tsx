import CommentCard from './components/CommentCard';
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
    </main>
  );
};

export default App;
