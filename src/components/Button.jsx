import './Button.css';

export default function Button({ children, variant = 'primary', fluid, onClick, className = '', type = 'button' }) {
  const classes = ['fx-btn', `fx-btn-${variant}`];
  if (fluid) classes.push('fx-btn-fluid');
  if (className) classes.push(className);
  
  return (
    <button type={type} className={classes.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
}
