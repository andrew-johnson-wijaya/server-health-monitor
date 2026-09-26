import { useEffect, useState } from 'react'

// This interface perfectly matches our Go struct
interface ServerMetrics {
  cpu_usage: number;
  memory_usage: number;
  uptime: string;
  status: string;
}

function App() {
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('https://server-health-monitor-one.vercel.app/api/metrics');
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics", error);
      }
    };

    // Fetch immediately, then poll every 3 seconds
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div style={{ padding: '2rem' }}>Loading Server Data...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Server Health Dashboard</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', minWidth: '150px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>CPU Usage</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.cpu_usage.toFixed(1)}%</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', minWidth: '150px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>RAM Usage</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>{metrics.memory_usage.toFixed(1)}%</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', minWidth: '150px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>System Status</h3>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{metrics.status}</p>
          <small style={{ color: '#6b7280' }}>Uptime: {metrics.uptime}</small>
        </div>
      </div>
    </div>
  )
}

export default App;