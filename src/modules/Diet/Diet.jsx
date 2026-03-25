import React from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';

export default function Diet() {
  return (
    <div>
      <Header title="Diet Plan" subtitle="Indian-focused meals" />
      <Card highlight style={{marginBottom: 16}}>
        <h3>Breakfast</h3>
        <p>2 Poha + 1 Boiled Egg (350 kcal)</p>
        <p style={{color: 'var(--accent-neon)', fontSize: '0.8rem', marginTop: 8}}>Swap: Oats Upma</p>
      </Card>
      <Card style={{marginBottom: 16}}>
        <h3>Lunch</h3>
        <p>2 Chapati + Dal Tadka + Salad (450 kcal)</p>
      </Card>
      <Card>
        <h3>Dinner</h3>
        <p>Grilled Paneer + Roasted Veggies (400 kcal)</p>
      </Card>
    </div>
  );
}
