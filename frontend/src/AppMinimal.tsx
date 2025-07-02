import { useEffect, useState } from 'react';

export default function AppMinimal() {
  const [data, setData] = useState<any[]>([]);
  
  useEffect(() => {
    fetch('/api/prizepicks/props')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);
  
  return (
    <div style={{ padding: 20 }}>
      <h1>PrizePicks Props</h1>
      <ul>
        {data.slice(0,10).map((p,i) => (
          <li key={i}>{p.player_name} — {p.stat_type}: {p.line_score}</li>
        ))}
      </ul>
    </div>
  );
} 