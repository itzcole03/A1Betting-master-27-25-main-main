import * as React from 'react';
import { createRoot } from 'react-dom/client';

function AppMinimal() {
  const [data, setData] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    fetch('/api/prizepicks/props')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);
  
  return React.createElement('div', { style: { padding: 20 } }, [
    React.createElement('h1', { key: 'title' }, 'PrizePicks Props'),
    React.createElement('ul', { key: 'list' }, 
      data.slice(0,10).map((p,i) => 
        React.createElement('li', { key: i }, 
          `${p.player_name} — ${p.stat_type}: ${p.line_score}`
        )
      )
    )
  ]);
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(React.createElement(AppMinimal));
} 