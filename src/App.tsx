import CommentCard from './components/CommentCard';
import DUMMY_DATA from './store/DUMMY_DATA';

const App: React.FC = () => {
  const data = DUMMY_DATA;

  return (
    <main>
      {data.map(comment => {
        return <CommentCard comment={comment} />;
      })}
    </main>
  );
};

export default App;
