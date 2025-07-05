import { motion } from "framer-motion";
import { useEffect } from "react";
import { Activity, Cpu, HardDrive, Wifi, Zap, TrendingUp } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function Performance() {
  const { setCurrentPage } = useAppStore();

  useEffect(() => {
    setCurrentPage("performance");
  }, [setCurrentPage]);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Performance Monitor
        </h1>
        <p className="text-muted-foreground">
          Real-time system performance metrics and optimization
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "CPU Usage",
            value: "45%",
            icon: Cpu,
            color: "text-blue-500",
          },
          {
            name: "Memory",
            value: "2.1GB",
            icon: Activity,
            color: "text-green-500",
          },
          {
            name: "Disk I/O",
            value: "128 MB/s",
            icon: HardDrive,
            color: "text-purple-500",
          },
          {
            name: "Network",
            value: "1.2 Gb/s",
            icon: Wifi,
            color: "text-cyan-500",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className="text-2xl font-bold text-foreground">
                  {metric.value}
                </p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center py-20">
        <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Performance Dashboard
        </h3>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
}
