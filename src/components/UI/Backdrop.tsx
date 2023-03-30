import { uiActions } from '../../store/uiSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import './backdrop.scss';

interface BackdropProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="backdrop" onClick={() => dispatch(uiActions.closeModal())}>
      {children}
    </div>
  );
};

export default Backdrop;
