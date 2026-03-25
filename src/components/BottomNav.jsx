import './BottomNav.css';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'coach', label: 'Coach', icon: '🤖' },
  { id: 'progress', label: 'Progress', icon: '📈' },
  { id: 'weight', label: 'Weight', icon: '⚖' },
  { id: 'profile', label: 'Profile', icon: '👤' }
];

export default function BottomNav({ activeTab, onTabSelect }) {
  return (
    <nav className="fx-bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`fx-nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabSelect(tab.id)}
        >
          <span className="fx-nav-icon">{tab.icon}</span>
          <span className="fx-nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
