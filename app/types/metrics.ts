export interface MetricsData {
  total_hits: number;
  unique_ips: number;
  avg_resolution_time: number;
}

export interface MetricsProps {
  metrics: MetricsData | null;
}

export interface UrlMetricsProps extends MetricsProps {
  url?: string;
  metricsKey?: string;
}

export interface MetricsPageProps {
  params: { key: string };
}

export interface TopFiveBarChartProps {
  data: { [key: string]: number };
}
