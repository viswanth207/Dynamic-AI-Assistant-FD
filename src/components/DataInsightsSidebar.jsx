import React from 'react';

const DataInsightsSidebar = ({ attributes, data_source_type, assistantName, graphData }) => {

  // Helper to generate bar heights
  const getBarHeight = (val, max) => {
    return max > 0 ? `${(val / max) * 100}%` : '0%';
  };

  // Helper to generate donut gradient
  const getDonutGradient = (values) => {
    if (!values || values.length === 0) return 'none';
    const total = values.reduce((a, b) => a + b, 0);
    let accum = 0;
    const colors = ['#a855f7', '#ec4899', '#6366f1', '#10b981', '#f59e0b'];
    const segments = values.map((val, i) => {
      const start = (accum / total) * 360;
      const end = ((accum + val) / total) * 360;
      accum += val;
      return `${colors[i % colors.length]} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${segments.join(', ')})`;
  };

  // Helper to generate simple SVG line path
  const getLinePath = (points, isFill = false) => {
    if (!points || points.length < 2) return '';
    const width = 100;
    const height = 40;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    // Generate points
    const coords = points.map((val, i) => {
      const x = (i / (points.length - 1)) * width;
      // Scale y to fit in 5-35 range (leaving 5px padding top/bottom)
      const y = height - 5 - ((val - min) / range) * 30;
      return `${x},${y}`;
    });

    if (isFill) {
      return `M0,40 L${coords.join(' L')} L100,40 Z`;
    }
    return `M${coords.join(' L')}`;
  };

  const donutColors = ['#a855f7', '#ec4899', '#6366f1', '#10b981', '#f59e0b'];

  return (
    <div className="insights-sidebar">
      <div className="insights-header">
        <h4>Data Insights</h4>
        <span className="source-type-pill">{data_source_type} source</span>
      </div>

      <div className="insights-content">
        <div className="insights-section">
          <h5 className="section-title">DATASET ATTRIBUTES</h5>
          <div className="attributes-list">
            {attributes && attributes.length > 0 ? (
              attributes.map((attr, idx) => (
                <div key={idx} className="attribute-chip">
                  <span className="attr-icon">❖</span>
                  {attr}
                </div>
              ))
            ) : (
              <p className="empty-text">No specific attributes found.</p>
            )}
          </div>
        </div>

        {/* 1. Frequency Chart (Dynamic) */}
        {graphData?.bar_chart && (
          <div className="insights-section">
            <h5 className="section-title">{graphData.bar_chart.title.toUpperCase()}</h5>
            <div className="analytics-placeholder">
              <div className="mini-chart">
                {graphData.bar_chart.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="chart-bar"
                    style={{ height: getBarHeight(val, Math.max(...graphData.bar_chart.values)) }}
                    title={`${graphData.bar_chart.labels[idx]}: ${val}`}
                  ></div>
                ))}
              </div>
              <p className="chart-label">Top 5 Most Frequent Values</p>
            </div>
          </div>
        )}

        {/* 2. Donut Chart (Dynamic) */}
        {graphData?.donut_chart && (
          <div className="insights-section">
            <h5 className="section-title">{graphData.donut_chart.title.toUpperCase()}</h5>
            <div className="analytics-card">
              <div className="donut-chart-container">
                <div className="donut-chart" style={{ background: getDonutGradient(graphData.donut_chart.values) }}>
                  <div className="donut-hole">
                    <span className="donut-val">{graphData.donut_chart.center_label}</span>
                    <span className="donut-label">{graphData.donut_chart.center_text}</span>
                  </div>
                </div>
              </div>
              <div className="chart-legend">
                {graphData.donut_chart.labels.map((label, idx) => (
                  <div key={idx} className="legend-item">
                    <span className="dot" style={{ background: donutColors[idx % donutColors.length] }}></span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Trend Line Chart (Dynamic) */}
        {graphData?.line_chart && (
          <div className="insights-section">
            <h5 className="section-title">{graphData.line_chart.title.toUpperCase()}</h5>
            <div className="analytics-card">
              <svg className="line-chart-svg" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="lineGap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={getLinePath(graphData.line_chart.data_points, true)} fill="url(#lineGap)" stroke="none" />
                <path d={getLinePath(graphData.line_chart.data_points, false)} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeJoin="round" />
              </svg>
              <div className="trend-stats">
                <div className="trend-item">
                  <span className="trend-val">{graphData.line_chart.avg_value}</span>
                  <span className="trend-lbl">{graphData.line_chart.trend_label}</span>
                </div>
                <div className="trend-item">
                  <span className="trend-val up">{graphData.line_chart.trend_change}</span>
                  <span className="trend-lbl">Trend</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="dataset-footer">
        <p style={{ opacity: 0.6 }}>Analyzing: <strong style={{ color: 'white' }}>{assistantName}</strong></p>
      </div>
    </div>
  );
};

export default DataInsightsSidebar;
