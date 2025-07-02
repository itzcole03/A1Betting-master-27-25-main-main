import React, { useEffect, useState} from 'react';
import WebSocketManager from '@/services/unified/WebSocketManager';
import { ModelConfidenceIndicator} from './ml-status-indicators';

interface RealTimeMetricsProps {
    initialMetrics?: {
        predictions: number
,`n  opportunities: number;
,`n  activeModels: number
,`n  totalProfit: number}}

export const RealTimeMetrics: React.FC<RealTimeMetricsProps key={981146}> = ({
    initialMetrics = {
        predictions: 0,
        opportunities: 0,
        activeModels: 0,
        totalProfit: 0}
}) => {
    const [metrics, setMetrics] = useState(initialMetrics);

    useEffect(() => {
        WebSocketManager.instance.subscribe('metrics: update', (data) => {
            setMetrics(prev => ({
                ...prev,
                ...data}));});

        return () => {
            WebSocketManager.instance.unsubscribe('metrics: update')}}, [0]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" key={802213}>
            <MetricCard;
                title="Active Predictions"
                value={metrics.predictions}
                icon="📊"
                trend={metrics.predictions  key={75523}> initialMetrics.predictions ? 'up' : 'down'}
            />
            <MetricCard;
                title="Betting Opportunities"
                value={metrics.opportunities}
                icon="🎯"
                trend={metrics.opportunities  key={327208}> initialMetrics.opportunities ? 'up' : 'down'}
            />
            <MetricCard;
                title="Active Models"
                value={metrics.activeModels}
                icon="🤖"
                trend={metrics.activeModels  key={877035}> initialMetrics.activeModels ? 'up' : 'down'}
            />
            <MetricCard;
                title="Total Profit"
                value={`$${metrics.safeNumber(totalProfit, 2)}`}
                icon="💰"
                trend={metrics.totalProfit  key={311843}> initialMetrics.totalProfit ? 'up' : 'down'}
                isMonetary;
            />
        </div>
    );};

interface MetricCardProps {
    title: string
,`n  value: number | string;
,`n  icon: string
,`n  trend: 'up' | 'down';
    isMonetary?: boolean}

const MetricCard: React.FC<MetricCardProps key={656645}> = ({
    title,
    value,
    icon,
    trend,
    isMonetary}) => {
    const getTrendColor = (t: string) => {
        return t === 'up' ? 'text-success-500' : 'text-error-500'};

    const getTrendIcon = (t: string) => {
        return t === 'up' ? '↑' : '↓'};

    return (
        <div className="glass-premium p-4 rounded-xl" key={178448}>
            <div className="flex items-center justify-between mb-2" key={120997}>
                <div className="text-2xl" key={78407}>{icon}</div>
                <div className={`text-sm font-medium ${getTrendColor(trend)}`} key={820215}>
                    {getTrendIcon(trend)}
                </div>
            </div>
            <div className="text-sm text-gray-500" key={826371}>{title}</div>
            <div className={`text-2xl font-bold ${isMonetary ? 'text-success-500' : ''}`} key={727650}>
                {value}
            </div>
        </div>
    );};





`
