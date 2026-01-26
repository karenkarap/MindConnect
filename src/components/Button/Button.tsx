import css from './Button.module.css';

interface ButtonProps {
  type: 'button' | 'submit';
  text: string;
  size: 's' | 'm' | 'l';
  color: 'main' | 'transparent';
  icon?: React.ReactNode;
}

const Button = ({ type = 'button', text, size = 'm', color = 'main', icon }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${css.button} ${css[`size-${size}`]} ${css[`color-${color}`]} `}
    >
      {text}
      {icon}
    </button>
  );
};

export default Button;
