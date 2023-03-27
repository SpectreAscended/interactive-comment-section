import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import DUMMY_DATA from '../store/DUMMY_DATA';
import CommentSectionPage from './CommentSection';

const RootLayout: React.FC = () => {
  const data = DUMMY_DATA;
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
