import './button.scss';

interface ButtonProps {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'primary' | 'secondary';
  disabled?: boolean | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = undefined,
}) => {
  let buttonClasses = 'button button--primary';

  if (variant === 'secondary') {
    buttonClasses = 'button button--secondary';
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
