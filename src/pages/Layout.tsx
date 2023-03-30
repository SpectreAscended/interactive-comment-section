import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import DUMMY_DATA from '../store/DUMMY_DATA';
import Modal from '../components/UI/Modal';

const RootLayout: React.FC = () => {
  const data = DUMMY_DATA;
  return (
    <>
      <Header />
      <Modal title="Modal title" message="Modal message" onPrimary={() => {}} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
