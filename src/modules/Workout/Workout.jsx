import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';

export default function Workout() {
  return (
    <div>
      <Header title="Workout Plan" subtitle="Your weekly schedule" />
      <Card highlight style={{marginBottom: 16}}>
        <h3>Today: Upper Body Power</h3>
        <p style={{color: 'var(--text-secondary)', marginTop: 8, fontSize: '0.85rem'}}>45 min • Gym</p>
        <div style={{marginTop: 16}}>
          <Button fluid>Start Workout</Button>
        </div>
      </Card>
      <Card>
        <h3>Upcoming</h3>
        <p style={{marginTop: 8}}>Tomorrow: Lower Body Hypertrophy</p>
        <p style={{marginTop: 8}}>Thursday: Rest / Light Cardio</p>
      </Card>
    </div>
  );
}
