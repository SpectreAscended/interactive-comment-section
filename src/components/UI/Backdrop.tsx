import { uiActions } from '../../store/uiSlice';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { motion } from 'framer-motion';
import './backdrop.scss';

interface BackdropProps {
  children: React.ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => dispatch(uiActions.closeModal())}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
