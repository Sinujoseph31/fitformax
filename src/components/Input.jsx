import './Input.css';

export default function Input({ label, type = 'text', placeholder, value, onChange, name, required = false }) {
  return (
    <div className="fx-input-group">
      {label && <label className="fx-input-label">{label}{required && <span className="fx-required">*</span>}</label>}
      <input
        type={type}
        className="fx-input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
    </div>
  );
}
