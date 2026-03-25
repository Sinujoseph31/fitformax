import './Header.css';

export default function Header({ title, subtitle, rightElement }) {
  return (
    <header className="fx-header">
      <div className="fx-header-left">
        <h1 className="fx-header-title">{title}</h1>
        {subtitle && <p className="fx-header-subtitle">{subtitle}</p>}
      </div>
      {rightElement && <div className="fx-header-right">{rightElement}</div>}
    </header>
  );
}
