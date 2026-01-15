import { wfmMetrics } from "../../data/wfmMetricsData";

export default function WFMMetrics() {
  return (
    <div className="terminology-page">
      <h1>WFM Metrics & Terminology</h1>

      {wfmMetrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <h3>{metric.name}</h3>
          <p><strong>Definition:</strong> {metric.definition}</p>
          <p><strong>Formula:</strong> {metric.formula}</p>
        </div>
      ))}
    </div>
  );
}
