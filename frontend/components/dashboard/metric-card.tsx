interface MetricCardProps {
  label: string;
  value: string | number;
  description: string;
}

export default function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-description">{description}</div>
    </div>
  );
}