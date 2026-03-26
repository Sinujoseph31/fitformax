import './Button.css';

export default function Button({ children, variant = 'primary', highlight, fluid, onClick, className = '', type = 'button' }) {
  const classes = ['fx-btn', `fx-btn-${variant}`];
  if (highlight) classes.push('fx-btn-highlight');
  if (fluid) classes.push('fx-btn-fluid');
  if (className) classes.push(className);
  
  return (
    <button type={type} className={classes.join(' ')} onClick={onClick}>
      {children}
    </button>
  );
}
