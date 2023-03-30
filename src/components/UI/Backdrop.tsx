import './backdrop.scss';

interface BackdropProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => {
  return (
    <div className="backdrop" onClick={onClose}>
      {children}
    </div>
  );
};

export default Backdrop;
