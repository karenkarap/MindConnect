import css from './Button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit';
  text: string;
  size?: 's' | 'm' | 'l';
  color: 'main' | 'transparent';
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Button = ({
  type = 'button',
  text,
  size = 'm',
  color = 'main',
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${css.button} ${css[`size-${size}`]} ${css[`color-${color}`]} `}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
