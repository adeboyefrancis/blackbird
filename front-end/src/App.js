import { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #090c12;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 13px;
    color: #e2e8f0;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 24px;
  }

  #root { width: 100%; max-width: 1100px; }

  .shell {
    background: #0e1117;
    border: 1px solid #1e2433;
    border-radius: 12px;
    overflow: hidden;
  }

  /* ── Topbar ── */
  .topbar {
    background: #0e1117;
    border-bottom: 1px solid #1e2433;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex; align-items: center; gap: 8px;
    font-size: 15px; font-weight: 600; letter-spacing: -0.3px; color: #fff;
  }
  .logo-icon {
    width: 24px; height: 24px; background: #f97316;
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
  }
  .site-badge {
    background: #1a2235; border: 1px solid #2a3450;
    padding: 5px 12px; border-radius: 6px;
    font-size: 12px; color: #94a3b8;
    font-family: 'IBM Plex Mono', monospace;
    display: flex; align-items: center; gap: 4px;
  }
  .site-badge span { color: #f97316; font-weight: 500; }
  .status-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e; box-shadow: 0 0 6px #22c55e80; flex-shrink: 0;
  }
  .timestamp { font-size: 11px; color: #4a5568; font-family: 'IBM Plex Mono', monospace; }

  /* ── Body layout ── */
  .body { display: grid; grid-template-columns: 200px 1fr; min-height: 530px; }

  /* ── Sidebar ── */
  .sidebar {
    background: #090c12; border-right: 1px solid #1e2433;
    padding: 16px 0; display: flex; flex-direction: column;
  }
  .nav-label {
    font-size: 10px; font-weight: 500; letter-spacing: 0.08em;
    color: #4a5568; text-transform: uppercase;
    padding: 0 16px; margin: 14px 0 4px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 16px; font-size: 13px;
    font-family: 'IBM Plex Sans', sans-serif;
    color: #64748b; background: none; border: none;
    border-left: 2px solid transparent;
    cursor: pointer; width: 100%; text-align: left;
    transition: color 0.15s, background 0.15s, border-color 0.15s;
  }
  .nav-item:hover { color: #94a3b8; background: #0e1117; }
  .nav-item.active { color: #f97316; background: #1a1208; border-left-color: #f97316; }

  /* ── Main ── */
  .main { padding: 20px; display: flex; flex-direction: column; gap: 16px; min-width: 0; }

  /* ── Metrics ── */
  .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .metric {
    background: #131820; border: 1px solid #1e2433;
    border-radius: 8px; padding: 12px 14px;
  }
  .metric-label {
    font-size: 11px; color: #4a5568;
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
  }
  .metric-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 22px; font-weight: 500; color: #e2e8f0; line-height: 1;
  }
  .metric-value.accent { color: #f97316; }
  .metric-value.green  { color: #22c55e; }
  .metric-value.amber  { color: #eab308; }
  .metric-sub  { font-size: 11px; color: #4a5568; margin-top: 4px; }
  .metric-delta { font-size: 11px; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; color: #4a5568; }
  .metric-delta.up   { color: #22c55e; }
  .metric-delta.down { color: #ef4444; }

  /* ── Grid ── */
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* ── Card shared ── */
  .card { background: #131820; border: 1px solid #1e2433; border-radius: 8px; overflow: hidden; }
  .card-header {
    padding: 10px 14px; border-bottom: 1px solid #1e2433;
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title {
    font-size: 12px; font-weight: 500; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.07em;
  }
  .card-tag {
    font-size: 10px; padding: 2px 8px; border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    background: #0e1117; border: 1px solid #2a3450; color: #64748b;
  }
  .card-tag.live { border-color: #22c55e40; color: #22c55e; background: #052012; }
  .card-body { padding: 12px 14px; }

  /* ── Site Map ── */
  .map-canvas { position: relative; background: #0a1520; height: 200px; overflow: hidden; }
  .map-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(30,36,51,0.8) 1px, transparent 1px),
      linear-gradient(90deg, rgba(30,36,51,0.8) 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .contour {
    position: absolute; border-radius: 50%; border: 1px solid;
    transform: translate(-50%, -50%); opacity: 0.4; pointer-events: none;
  }
  .drone-marker {
    position: absolute; width: 10px; height: 10px;
    background: #f97316; border-radius: 50%;
    border: 2px solid #090c12; box-shadow: 0 0 0 2px #f9731640;
    transform: translate(-50%, -50%);
    animation: pulseDrone 2s ease-in-out infinite;
  }
  @keyframes pulseDrone {
    0%, 100% { box-shadow: 0 0 0 2px #f9731640; }
    50%       { box-shadow: 0 0 0 6px #f9731620; }
  }
  .map-info {
    position: absolute; top: 8px; left: 10px;
    font-family: 'IBM Plex Mono', monospace; font-size: 10px;
    color: #4a5568; line-height: 1.6;
  }
  .map-info-accent { color: #f97316; }
  .map-legend { position: absolute; bottom: 8px; right: 10px; display: flex; flex-direction: column; gap: 3px; }
  .legend-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #4a5568; font-family: 'IBM Plex Mono', monospace; }
  .legend-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  /* ── Volume Chart ── */
  .vol-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .vol-label { font-size: 11px; color: #64748b; width: 90px; flex-shrink: 0; font-family: 'IBM Plex Mono', monospace; }
  .vol-track { flex: 1; height: 6px; background: #1e2433; border-radius: 3px; overflow: hidden; }
  .vol-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .vol-val { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #94a3b8; width: 48px; text-align: right; flex-shrink: 0; }

  /* ── Survey List ── */
  .survey-list { display: flex; flex-direction: column; gap: 6px; }
  .survey-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 10px; background: #0e1117;
    border-radius: 6px; border: 1px solid #1e2433; gap: 12px;
  }
  .survey-name { font-size: 12px; color: #94a3b8; }
  .survey-date { font-size: 10px; color: #4a5568; margin-top: 2px; font-family: 'IBM Plex Mono', monospace; }
  .survey-status {
    font-size: 10px; font-family: 'IBM Plex Mono', monospace;
    padding: 2px 8px; border-radius: 4px; white-space: nowrap; flex-shrink: 0;
  }
  .survey-status.complete   { background: #052012; color: #22c55e; border: 1px solid #22c55e30; }
  .survey-status.processing { background: #1a1208; color: #f97316; border: 1px solid #f9731630; }
  .survey-status.scheduled  { background: #0e1420; color: #60a5fa; border: 1px solid #60a5fa30; }
  .span2 { grid-column: span 2; }
`;

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV = [
  { section: 'Worksite', items: [{ id: 'overview', label: 'Overview' }, { id: 'surveys', label: 'Surveys' }, { id: 'analytics', label: 'Analytics' }, { id: 'aeropoints', label: 'AeroPoints' }] },
  { section: 'Machine',  items: [{ id: 'dirtmate', label: 'DirtMate' }, { id: 'fleet', label: 'Fleet' }] },
  { section: 'Team',     items: [{ id: 'members', label: 'Members' }] },
];

const METRICS = [
  { label: 'Total Volume Cut',  value: '18,240', sub: 'm³ this month',          delta: '+12.4% vs last',  deltaType: 'up',      valueStyle: 'accent' },
  { label: 'Surveys Uploaded',  value: '47',     sub: 'since project start',    delta: '+3 this week',    deltaType: 'up',      valueStyle: '' },
  { label: 'Accuracy (CE90)',   value: '±2.1 cm',sub: 'avg across surveys',     delta: 'within spec',     deltaType: '',        valueStyle: 'green' },
  { label: 'Budget Variance',   value: '-4.2%',  sub: 'of earthworks budget',   delta: 'alert threshold', deltaType: 'down',    valueStyle: 'amber' },
];

const CONTOURS = [
  { width: 160, height: 80,  top: 55, left: 48, color: '#f9731450' },
  { width: 110, height: 55,  top: 55, left: 48, color: '#f9731470' },
  { width: 65,  height: 32,  top: 55, left: 48, color: '#f97314a0' },
  { width: 26,  height: 13,  top: 55, left: 48, color: '#f97314d0' },
  { width: 200, height: 100, top: 40, left: 30, color: '#22c55e25' },
  { width: 145, height: 72,  top: 40, left: 30, color: '#22c55e35' },
];

const ZONES = [
  { label: 'Zone A — Cut',  value: 8320, max: 9500, color: '#f97316' },
  { label: 'Zone B — Fill', value: 5660, max: 9500, color: '#22c55e' },
  { label: 'Zone C — Cut',  value: 4240, max: 9500, color: '#f97316' },
  { label: 'Stockpile',     value: 2050, max: 9500, color: '#eab308' },
  { label: 'Waste',         value: 1140, max: 9500, color: '#4a5568' },
];

const SURVEYS = [
  { id: 47, name: 'Survey #47 — Zone A + B full pass',      meta: '2026-03-19 · DJI Phantom 4 RTK · 312 images', status: 'processing' },
  { id: 46, name: 'Survey #46 — Stockpile count (north)',   meta: '2026-03-17 · DJI M300 RTK · 198 images',      status: 'complete'   },
  { id: 45, name: 'Survey #45 — Cut face inspection',       meta: '2026-03-14 · DJI Phantom 4 RTK · 255 images', status: 'complete'   },
  { id: 48, name: 'Survey #48 — Waste zone verification',   meta: 'Scheduled 2026-03-21 · Crew: T. Morris',       status: 'scheduled'  },
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');

  return (
    <>
      <style>{styles}</style>

      <div className="shell">

        {/* Topbar */}
        <div className="topbar">
          <div className="logo">
            <img
              src="https://www.propelleraero.com/wp-content/uploads/2021/05/Vector.svg"
              alt="Propeller"
              style={{ height: '22px', width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div className="site-badge">
            <div className="status-dot" />
            SITE: <span>GLENBROOK-04</span>&nbsp;|&nbsp;LIVE
          </div>
          <div className="timestamp">19 MAR 2026 &nbsp; 09:41 UTC</div>
        </div>

        <div className="body">

          {/* Sidebar */}
          <div className="sidebar">
            {NAV.map(({ section, items }) => (
              <div key={section}>
                <div className="nav-label">{section}</div>
                {items.map(({ id, label }) => (
                  <button
                    key={id}
                    className={`nav-item${activeNav === id ? ' active' : ''}`}
                    onClick={() => setActiveNav(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Main */}
          <main className="main">

            {/* Metrics */}
            <div className="metrics-row">
              {METRICS.map((m) => (
                <div key={m.label} className="metric">
                  <div className="metric-label">{m.label}</div>
                  <div className={`metric-value ${m.valueStyle}`}>{m.value}</div>
                  <div className="metric-sub">{m.sub}</div>
                  <div className={`metric-delta ${m.deltaType}`}>{m.delta}</div>
                </div>
              ))}
            </div>

            <div className="grid2">

              {/* Site Map */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">3D Site Map</span>
                  <span className="card-tag live">Live Drone</span>
                </div>
                <div className="map-canvas">
                  <div className="map-grid" />
                  {CONTOURS.map((c, i) => (
                    <div key={i} className="contour" style={{ width: c.width, height: c.height, top: `${c.top}%`, left: `${c.left}%`, borderColor: c.color }} />
                  ))}
                  <div className="drone-marker" style={{ top: '28%', left: '62%' }} />
                  <div className="map-info">
                    GLENBROOK QUARRY — SECTION B<br />
                    <span className="map-info-accent">ALT: 82m &nbsp; SPD: 6.2 m/s</span>
                  </div>
                  <div className="map-legend">
                    {[['#f97316','Excavation zone'],['#22c55e','Fill zone'],['#f97316','Drone (live)']].map(([color, label]) => (
                      <div key={label} className="legend-item">
                        <div className="legend-dot" style={{ background: color }} />{label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Volume Chart */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">Volume by Zone</span>
                  <span className="card-tag">m³</span>
                </div>
                <div className="card-body">
                  {ZONES.map((z) => (
                    <div key={z.label} className="vol-bar">
                      <div className="vol-label">{z.label}</div>
                      <div className="vol-track">
                        <div className="vol-fill" style={{ width: `${Math.round((z.value / z.max) * 100)}%`, background: z.color }} />
                      </div>
                      <div className="vol-val">{z.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Survey List */}
              <div className="card span2">
                <div className="card-header">
                  <span className="card-title">Recent Surveys</span>
                  <span className="card-tag">Last {SURVEYS.length}</span>
                </div>
                <div className="card-body">
                  <div className="survey-list">
                    {SURVEYS.map((s) => (
                      <div key={s.id} className="survey-item">
                        <div>
                          <div className="survey-name">{s.name}</div>
                          <div className="survey-date">{s.meta}</div>
                        </div>
                        <div className={`survey-status ${s.status}`}>{s.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </>
  );
}