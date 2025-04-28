import buttonStyles from "./Button.module.css";

const Button = ({
  children = "Click",
  className,
  onClick,
  disabled = false,
  ariaLabel,
  type,
}) => {
  return (
    <button
      className={`${buttonStyles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
