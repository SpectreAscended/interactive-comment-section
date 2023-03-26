import './button.scss';

interface ButtonProps {
  children: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
}) => {
  return (
    <button className="button" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
