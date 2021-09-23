import styles from './Button.module.css';

export default function Button({ variant = 'default', children, className, ...props }) {
  const extraClass = className ? ` ${className}` : '';
  return (
    <button className={`${styles[variant]}${extraClass}`} {...props}>
      {children}
    </button>
  );
}