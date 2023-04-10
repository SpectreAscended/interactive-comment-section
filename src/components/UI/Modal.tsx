import Backdrop from './Backdrop';
import { motion } from 'framer-motion';
import './modal.scss';
import { CommentDeleteData } from '../../types';

interface ModalProps {
  title: string;
  message: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onPrimary,
  onSecondary,
}) => {
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.75,
        type: 'spring',
        bounce: 0.25,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  return (
    <Backdrop>
      <motion.div
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="modal__heading">{title}</h2>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button
            className="modal__btn modal__btn--secondary"
            onClick={onSecondary}
          >
            Cancel
          </button>

          <button
            className="modal__btn modal__btn--primary"
            onClick={onPrimary}
          >
            Ok
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
