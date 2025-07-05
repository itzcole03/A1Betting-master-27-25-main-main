import { motion } from "framer-motion";
import { useEffect } from "react";
import { Brain, Cpu, Database, Zap } from "lucide-react";

const loadingSteps = [
  { icon: Brain, label: "Initializing AI Core", color: "text-blue-500" },
  { icon: Database, label: "Loading Memory Bank", color: "text-green-500" },
  { icon: Cpu, label: "Starting Agents", color: "text-purple-500" },
  { icon: Zap, label: "System Ready", color: "text-cyan-500" },
];

export default function LoadingScreen() {
  useEffect(() => {
    console.log("LoadingScreen component mounted");
    return () => console.log("LoadingScreen component unmounted");
  }, []);
  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-white">Cursor AI</h1>
            <p className="text-lg text-white">A1Betting Platform</p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="w-32 h-32 mx-auto relative">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>

          {/* Animated Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>

          {/* Inner Pulse */}
          <div className="absolute inset-4 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Initializing System
          </h2>

          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={step.label}
                className="flex items-center justify-center space-x-3"
              >
                <div className="animate-pulse">
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <span className="text-white">{step.label}</span>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-muted rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-cyan-500 w-full animate-pulse" />
          </div>
          <p className="text-sm text-white mt-2">Loading complete...</p>
        </div>

        {/* Version Info */}
        <div className="text-center space-y-1">
          <p className="text-xs text-white">Version 1.0.0 • Build 2025.01.19</p>
          <p className="text-xs text-white">
            Powered by Advanced AI Architecture
          </p>
        </div>
      </div>
    </div>
  );
}
