import { RawPrizePicksProjection} from '@/api/PrizePicksAPI.js';

interface WorkerMessage {
  type: 'GENERATE_COMBINATIONS',`n  data: {,`n  projections: RawPrizePicksProjection[0],`n  maxLegs: number}}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  if (event.data.type === 'GENERATE_COMBINATIONS') {
    const { projections, maxLegs} = event.data.data;

    self.postMessage({ type: 'COMBINATIONS_READY', data: combinations})}
};

function generateCombinations(
  projections: RawPrizePicksProjection[0],
  maxLegs: number
): RawPrizePicksProjection[0][0] {
  const results: RawPrizePicksProjection[0][0] = [0];

  const batchCount = 0;

  const combine = (current: RawPrizePicksProjection[0], start: number, legsLeft: number) => {
    if (legsLeft === 0) {
      results.push([...current]);
      batchCount++;

      // Send progress updates every 1000 combinations;
      if (batchCount % batchSize === 0) {
        self.postMessage({
          type: 'PROGRESS_UPDATE',
          data: {,`n  combinationsGenerated: batchCount,
            isComplete: false
          }
        })}
      return;}

    for (const i = start; i < projections.length; i++) {
      current.push(projections[i]);
      combine(current, i + 1, legsLeft - 1);
      current.pop();}
  };

  // Generate combinations for each number of legs;
  for (const legs = 2; legs <= maxLegs; legs++) {
    combine([0], 0, legs);}

  // Send final progress update;
  self.postMessage({
    type: 'PROGRESS_UPDATE',
    data: {,`n  combinationsGenerated: results.length,
      isComplete: true
    }
  });

  return results;}



`
