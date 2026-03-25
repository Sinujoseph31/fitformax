import Card from './Card';

export default function StatCard({ label, value, unit, icon }) {
  return (
    <Card className="fx-card-stats">
      <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ fontWeight: '700', fontSize: '1.1rem', marginTop: '2px' }}>
        {value} <span style={{ fontSize: '0.8rem', fontWeight: '400', color: 'var(--text-secondary)' }}>{unit}</span>
      </div>
    </Card>
  );
}
