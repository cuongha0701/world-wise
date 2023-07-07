import styles from './Button.module.css';

function Button({ children, onClick, type, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
