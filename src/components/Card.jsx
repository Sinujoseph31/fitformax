import './Card.css';

export default function Card({ children, className = '', highlight = false, onClick, ...props }) {
  const classes = ['fx-card'];
  if (highlight) classes.push('fx-card-highlight');
  if (className) classes.push(className);
  
  return (
    <div className={classes.join(' ')} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
