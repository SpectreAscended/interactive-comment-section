import './button.scss';

interface ButtonProps {
  children: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}) => {
  let buttonClasses = 'button button--primary';

  if (variant === 'secondary') {
    buttonClasses = 'button button--secondary';
  }

  return (
    <button className={buttonClasses} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
