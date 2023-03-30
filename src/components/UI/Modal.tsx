import Backdrop from './Backdrop';
import { useDispatch } from 'react-redux/es/exports';
import './modal.scss';
import { uiActions } from '../../store/uiSlice';

interface ModalProps {
  title: string;
  message: string;
  onPrimary: () => void;
  onSecondary?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onPrimary,
  onSecondary,
}) => {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(uiActions.closeModal);
  };
  return (
    <Backdrop onClose={closeModalHandler}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h1 className="modal__heading">{title}</h1>
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
      </div>
    </Backdrop>
  );
};

export default Modal;
