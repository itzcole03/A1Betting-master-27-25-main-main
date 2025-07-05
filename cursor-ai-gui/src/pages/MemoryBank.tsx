import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Database,
  FileText,
  Search,
  Download,
  Upload,
  RefreshCw,
  Archive,
  Clock,
  Activity,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { formatDate, formatNumber, bytesToSize } from "@/lib/utils";
import { useMemoryBank } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import { toast } from "react-hot-toast";

export default function MemoryBank() {
  const { setCurrentPage, addLog, addNotification } = useAppStore();
  const { memoryBankStatus, files, loading, refetch } = useMemoryBank();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    setCurrentPage("memory-bank");
  }, [setCurrentPage]);

  const handleFileSelect = async (fileName: string) => {
    setSelectedFile(fileName);

    if (fileName.endsWith("/")) {
      // Directory selected
      setFileContent(null);
      return;
    }

    try {
      setLoadingContent(true);
      const fileData = await apiService.getMemoryBankFile(fileName);
      setFileContent(fileData.content);
    } catch (error) {
      toast.error("Failed to load file content");
      setFileContent("Failed to load file content");
    } finally {
      setLoadingContent(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await apiService.updateMemoryBank();
      await refetch();

      addNotification({
        title: "Memory Bank Updated",
        message: "Memory bank refreshed successfully",
        type: "success",
      });

      addLog({
        level: "info",
        source: "Memory Bank",
        message: "Memory bank updated successfully",
      });
    } catch (error) {
      toast.error("Failed to update memory bank");
    }
  };

  const handleExport = async () => {
    try {
      // This would download the entire memory bank
      toast.success("Memory bank export started");

      addLog({
        level: "info",
        source: "Memory Bank",
        message: "Memory bank export initiated",
      });
    } catch (error) {
      toast.error("Failed to export memory bank");
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const healthStats = [
    {
      name: "Total Files",
      value: memoryBankStatus?.totalFiles || 0,
      icon: FileText,
      color: "text-blue-500",
    },
    {
      name: "Chat Archives",
      value: memoryBankStatus?.chatArchives || 0,
      icon: Archive,
      color: "text-green-500",
    },
    {
      name: "Size",
      value: "51.2 MB",
      icon: Database,
      color: "text-purple-500",
    },
    {
      name: "Last Sync",
      value: "Just now",
      icon: RefreshCw,
      color: "text-cyan-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Memory Bank</h1>
          <p className="text-muted-foreground">
            Manage and explore the persistent AI memory system
          </p>
        </div>

        {/* Health Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {healthStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Browser */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Files</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Refresh Memory Bank"
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search memory bank files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                <span>Name</span>
                <span>Size</span>
                <span>Type</span>
                <span>Modified</span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {filteredFiles.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => handleFileSelect(file.name)}
                >
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      {file.type === "directory" ? (
                        <Archive className="w-4 h-4 text-blue-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-foreground font-medium">
                        {file.name}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {file.size > 0 ? bytesToSize(file.size) : "--"}
                    </span>
                    <span className="text-muted-foreground capitalize">
                      {file.type}
                    </span>
                    <span className="text-muted-foreground">
                      {formatDate(file.lastModified)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-foreground">
            System Status
          </h2>

          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Memory Bank Health
              </span>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">
                  Excellent
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Codebase Context</span>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Chat Archives</span>
                <span className="text-foreground font-medium">
                  24 conversations
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Auto-Sync</span>
                <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Memory Bank</span>
              </button>
            </div>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-lg p-4 space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">
                File Details
              </h3>

              {(() => {
                const file = files.find((f) => f.name === selectedFile);
                return file ? (
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name: </span>
                      <span className="text-foreground font-medium">
                        {file.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type: </span>
                      <span className="text-foreground capitalize">
                        {file.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size: </span>
                      <span className="text-foreground">
                        {file.size > 0 ? bytesToSize(file.size) : "--"}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Last Modified:{" "}
                      </span>
                      <span className="text-foreground">
                        {formatDate(file.lastModified)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    File information not available
                  </div>
                );
              })()}

              {!selectedFile.endsWith("/") && (
                <div className="border-t border-border pt-4">
                  {loadingContent ? (
                    <div className="flex items-center justify-center py-4">
                      <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="ml-2 text-sm text-muted-foreground">
                        Loading content...
                      </span>
                    </div>
                  ) : fileContent ? (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Content Preview
                      </h4>
                      <div className="bg-background rounded-lg p-3 max-h-40 overflow-y-auto">
                        <pre className="text-xs text-foreground whitespace-pre-wrap">
                          {fileContent.length > 500
                            ? fileContent.substring(0, 500) +
                              "\n...\n[Content truncated]"
                            : fileContent}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleFileSelect(selectedFile)}
                      className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      Load Content
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
