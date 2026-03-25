import React, { useState } from 'react';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function HealthAnalysis() {
  const [method, setMethod] = useState('manual'); // 'pdf' or 'manual'

  return (
    <div>
      <Header title="Health Analysis" subtitle="Track your biomarkers" />
      <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
        <Button variant={method === 'manual' ? 'primary' : 'secondary'} onClick={() => setMethod('manual')}>Manual</Button>
        <Button variant={method === 'pdf' ? 'primary' : 'secondary'} onClick={() => setMethod('pdf')}>Upload PDF</Button>
      </div>

      <Card>
        {method === 'pdf' ? (
          <div style={{textAlign: 'center', padding: '20px 0'}}>
            <p style={{marginBottom: 16, color: 'var(--text-secondary)'}}>Upload your lab report PDF to extract markers.</p>
            <Button>Select File</Button>
          </div>
        ) : (
          <div>
            <h3>Manual Entry</h3>
            <div style={{marginTop: 16}}>
              <Input label="Uric Acid (mg/dL)" type="number" placeholder="e.g. 5.2" />
              <Input label="Cholesterol (mg/dL)" type="number" placeholder="e.g. 180" />
              <Input label="Glucose (mg/dL)" type="number" placeholder="e.g. 95" />
              <Button variant="primary" fluid style={{marginTop: 8}}>Save Markers</Button>
            </div>
          </div>
        )}
      </Card>
      
      <div style={{marginTop: 16}}>
        <Card highlight>
          <h3>Insights</h3>
          <p style={{fontSize: '0.9rem', marginTop: 8}}>All markers are within healthy ranges. Keep maintaining your diet and exercise.</p>
        </Card>
      </div>
    </div>
  );
}
