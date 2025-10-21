declare module 'react-gauge-chart' {
  import { ReactNode } from 'react';
  interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    percent?: number;
    colors?: string[];
    arcWidth?: number;
    cornerRadius?: number;
    textColor?: string;
    needleColor?: string;
    children?: ReactNode;
  }
  const GaugeChart: React.FC<GaugeChartProps>;
  export default GaugeChart;
}