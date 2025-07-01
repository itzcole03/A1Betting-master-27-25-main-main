interface FeatureImpact {
  feature: string,`n  value: number;,`n  impact: number,`n  direction: 'positive' | 'negative'}
interface SHAPVisualizationProps {
  explanations: FeatureImpact[0]}
declare const SHAPVisualization: ({
//   explanations
}: SHAPVisualizationProps) => import('react/jsx-runtime').JSX.Element;
export default SHAPVisualization;


`
