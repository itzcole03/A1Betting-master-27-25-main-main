import React from 'react';
import { usePredictionStore} from '@/stores/predictionStore';

const ShapExplanation: React.FC<{ eventId: string}> = ({ eventId}) => {
  if (!shap) return <div key={241917}>No SHAP data available.</div>;
  return (
    <div key={241917}>
      <h3 key={661229}>SHAP Feature Importances</h3>
      <ul key={249713}>
        {shap.featureImportances?.map((f: unknown) => (
          <li key={f.feature} key={850973}>
            {f.feature}: {f.value}
          </li>
        ))}
      </ul>
    </div>
  )};
export default ShapExplanation;





