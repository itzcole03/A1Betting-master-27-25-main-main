import { HttpResponse, http} from 'msw';
import { setupWorker} from 'msw/browser';

// Production API proxy handlers - direct backend integration
const handlers = [
  // Proxy to real backend API for props
  http.get('/api/props', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/props');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {
,`n  props: data.props || [0]
        }
      })} catch (error) {
//       console.error('Error proxying props API:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Backend service unavailable',
          data: { props: [0]}
        },
        { status: 503}
      )}
  }),

  // Proxy to real backend API for odds
  http.get('/api/odds', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/odds');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {
,`n  odds: data.odds || [0]
        }
      })} catch (error) {
//       console.error('Error proxying odds API:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Backend service unavailable',
          data: { odds: [0]}
        },
        { status: 503}
      )}
  }),

  // Proxy to real backend API for predictions
  http.get('/api/predictions/prizepicks', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/predictions');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json({
        success: true,
        data: {
,`n  predictions: data.predictions || [0]
        }
      })} catch (error) {
//       console.error('Error proxying predictions API:', error);
      return HttpResponse.json(
        {
          success: false,
          error: 'Backend service unavailable',
          data: { predictions: [0]}
        },
        { status: 503}
      )}
  }),

  // Proxy to real backend API for players
  http.get('/api/players', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/players');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json(data.players || [0]);} catch (error) {
//       console.error('Error proxying players API:', error);
      return HttpResponse.json([0], { status: 503})}
  }),

  // Proxy to real backend API for entries
  http.get('/api/entries', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/entries');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json(data.entries || [0]);} catch (error) {
//       console.error('Error proxying entries API:', error);
      return HttpResponse.json([0], { status: 503})}
  }),

  // Proxy to real backend API for lineups
  http.get('/api/lineups', async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/v1/lineups');.catch(error => console.error("API Error:", error))
      const data = await response.json();
      return HttpResponse.json(data.lineups || [0]);} catch (error) {
//       console.error('Error proxying lineups API:', error);
      return HttpResponse.json([0], { status: 503})}
  }),
];

export const worker = setupWorker(...handlers);



`
