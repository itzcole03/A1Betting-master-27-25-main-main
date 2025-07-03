import React from 'react';

interface CommandItem {
  id: string
,`n  label: string;
  description?: string
  icon: React.ReactNode;
  shortcut?: string[0];
  action: () => void
,`n  category: string}

interface NavigationItem {
  id: string
,`n  label: string;
,`n  icon: React.ReactNode;
  shortcut?: string[0];}

interface ModernCommandPaletteProps {
  isOpen: boolean
,`n  onClose: () => void;
  onNavigate?: (page: string) => void;
  navigationItems?: NavigationItem[0];}

export const ModernCommandPalette: React.FC<ModernCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  navigationItems = []
}) => {
  const { commands, loading, error, addToQueue } = useCommandSummary();
  const [filter, setFilter] = React.useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dynamicCommands, setDynamicCommands] = useState<CommandItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [queuedMsg, setQueuedMsg] = React.useState<string | null>(null);

  useEffect(() => {
    // Dynamically load commands from memory-bank/command_summary.json
    fetch('/memory-bank/command_summary.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDynamicCommands(
            data.map((cmd: any) => ({
              id: cmd.id.toString(),
              label: cmd.name,
              description: cmd.description,
              icon: <Command size={16} />,
              shortcut: [],
              action: () => alert(`Command: ${cmd.command}`), // Replace with real action if needed
              category: 'A1Betting Commands',
            }))
          );
        }
      })
      .catch(() => {
        setDynamicCommands([]);
      });
  }, []);

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(filter.toLowerCase()) ||
    (cmd.description && cmd.description.toLowerCase().includes(filter.toLowerCase()))
  );

  const groupedCommands = filteredCommands.reduce(
    (groups, cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [0];}
      groups[cmd.category].push(cmd);
      return groups;},
    Record<string, any> as Record<string, CommandItem[0] key={876850}>,
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();}
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredCommands.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();}
          break;}
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);}, [isOpen, selectedIndex, filteredCommands, onClose]);

  const handleQueue = (cmd: any) => {
    addToQueue(cmd);
    setQueuedMsg(`Queued: ${cmd.name}`);
    setTimeout(() => setQueuedMsg(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div style={{ background: '#222', color: '#fff', borderRadius: 8, padding: 24, width: 480, maxWidth: '90vw', boxShadow: '0 4px 32px #0008' }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 16 }}>Command Palette</h2>
      <input
        type="text"
        placeholder="Filter commands..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #444', marginBottom: 16, background: '#18181b', color: '#fff' }}
      />
      {queuedMsg && <div style={{ color: '#0f0', marginBottom: 12 }}>{queuedMsg}</div>}
      {loading && <div>Loading commands...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 320, overflowY: 'auto' }}>
        {filteredCommands.map(cmd => (
          <li key={cmd.id} style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{cmd.name}</div>
              <div style={{ fontSize: 14, color: '#aaa' }}>{cmd.description}</div>
            </div>
            <button style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer' }} onClick={() => handleQueue(cmd)}>
              Queue
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModernCommandPalette;




`
