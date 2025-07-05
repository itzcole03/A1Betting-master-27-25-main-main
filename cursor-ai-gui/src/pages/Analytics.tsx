import { motion } from "framer-motion";
import { useEffect } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function Analytics() {
  const { setCurrentPage } = useAppStore();

  useEffect(() => {
    setCurrentPage("analytics");
  }, [setCurrentPage]);

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and insights
        </p>
      </motion.div>

      <div className="text-center py-20">
        <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Analytics Dashboard
        </h3>
        <p className="text-muted-foreground">
          Advanced analytics coming soon...
        </p>
      </div>
    </div>
  );
}
