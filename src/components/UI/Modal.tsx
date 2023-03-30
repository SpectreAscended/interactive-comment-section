import Backdrop from './Backdrop';
import './modal.scss';

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
  return (
    <Backdrop>
      <div className="modal">
        <h1 className="modal__heading">{title}</h1>
        <p className="modal__message">{message}</p>
        <div className="modal__actions">
          <button className="modal__btn modal__btn--secondary">Cancel</button>

          <button className="modal__btn modal__btn--primary">Ok</button>
        </div>
      </div>
    </Backdrop>
  );
};

export default Modal;
