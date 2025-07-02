import EnhancedPropCard from '@/components/ui/EnhancedPropCard';
import GlassCard from '@/components/ui/GlassCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState} from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number
,`n  value: number}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other} = props;
  return (
    <div aria-labelledby={`predictions-tab-${index}`}
      hidden={value !== index}
      id={`predictions-tabpanel-${index}`}
      role="tabpanel"
      {...other}
>`n    >
      {value === index && <Box sx={{ p: 3}}>{children}</Box>}
    </div>
  )}

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  "ws://localhost:8000/ws/model-predictions/client-frontend";

const riskProfiles = [
  { label: "Low", value: "low"},
  { label: "Medium", value: "medium"},
  { label: "High", value: "high"},
];

const Predictions: React.FC = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [riskProfile, setRiskProfile] = useState("medium");
  const [predictions, setPredictions] = useState<any[0]>([0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (
      !WS_URL ||
      WS_URL === "" ||
      WS_URL === "wss://api.betproai.com/ws" ||
      WS_URL.includes("api.betproai.com") ||
      WS_URL.includes("localhost:8000") ||
      (typeof import.meta !== 'undefined' && import.meta.env.VITE_ENABLE_WEBSOCKET === "false")
    ) {
      setLoading(false);
      setError("WebSocket connections are currently disabled");
      return;}

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "prediction_request",
          features: Record<string, any>,
          riskProfile: { type: riskProfile}
        })
      )};
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "prediction_result") {
          setPredictions(
            Array.isArray(msg.data.prediction)
              ? msg.data.prediction
              : [msg.data.prediction]
          );
          setLoading(false);} else if (msg.type === "error") {
          setError(msg.data?.message || "Error fetching predictions");
          setLoading(false);}
      } catch (e) {
        setError("Malformed message from server");
        setLoading(false);}
    };
    ws.onerror = () => {
      setError("WebSocket error");
      setLoading(false);};
    ws.onclose = () => {
      // Optionally: try to reconnect};
    return () => {
      ws.close();};}, [riskProfile]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)};

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    predictionId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPrediction(predictionId);};

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPrediction(null);};

  const handleAction = (action: string) => {
    // RESOLVED: Implement bet actions
    handleMenuClose()};

  const filteredPredictions = predictions.filter(
    (p) =>
      (!search ||
        p.match?.toLowerCase().includes(search.toLowerCase()) ||
        p.sport?.toLowerCase().includes(search.toLowerCase())) &&
      (value === 0
        ? p.status === "active"
        : value === 1
        ? p.status === "completed"
        : true)
  );

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-purple-900/80 to-purple-700/80 dark: from-gray-900 dark:to-gray-800 transition-colors">
      <GlassCard className="mb-8">
        <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">Model Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPredictions.length === 0 && !loading && (
            <Grid item xs={12}>
              <Typography>No predictions found.</Typography>
            </Grid>
          )}
          {filteredPredictions.map((prediction) => (
            <Grid key={prediction.id} item xs={12}>
              <EnhancedPropCard playerName={prediction.match}
                team={prediction.sport}
                position={prediction.prediction}
                statType="Confidence"
                line={Math.round(prediction.confidence * 100)}
                overOdds={prediction.odds}
                underOdds={prediction.odds}
                pickType="normal"
                trendValue={prediction.trend === "up" ? 1 : -1}
                gameInfo={{ opponent: 'BOS', day: 'Fri', time: '7:30pm'}}
                playerImageUrl="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
>`n                onSelect={() => Record<string, any>}
                onViewDetails={() => Record<string, any>}
              />
            </Grid>
          ))}
        </div>
      </GlassCard>
      {/* Advanced Widgets or analytics can be added here as needed */}
    </div>
  )};

export default Predictions;



`
