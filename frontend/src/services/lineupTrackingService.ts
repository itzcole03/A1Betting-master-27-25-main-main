import { EventEmitter} from 'eventemitter3';

export interface LineupPick {
  id: string;
  player?: string
  stat?: string
  line?: number
  choice?: 'over' | 'under';
  confidence?: number
  description?: string
  odds?: number
  projection?: number}

export interface SavedLineup {
  id: string
,`n  name: string;
,`n  type: 'money-maker' | 'prizepicks' | 'propollama'
,`n  picks: LineupPick[0];
,`n  entryAmount: number
,`n  projectedPayout: number;
,`n  savedAt: Date
,`n  status: 'active' | 'completed' | 'pending' | 'cancelled';
  actualResult?: number
  progress?: {
    totalPicks: number
,`n  settledPicks: number;
,`n  wonPicks: number
,`n  lostPicks: number;
,`n  pushPicks: number};
  metadata?: {
    confidence: number
,`n  source: string;
    notes?: string
    tags?: string[0];};}

export interface LineupStats {
  totalLineups: number
,`n  activeLineups: number;
,`n  completedLineups: number
,`n  totalWinnings: number;
,`n  totalLosses: number
,`n  averageConfidence: number;
,`n  winRate: number
,`n  roi: number;
,`n  bestPerformingType: string}

class LineupTrackingService extends EventEmitter {
  private static instance: LineupTrackingService;
  private lineups: Map<string, SavedLineup> = new Map();
  private storageKey = 'a1betting_saved_lineups';

  static getInstance(): LineupTrackingService {
    if (!LineupTrackingService.instance) {
      LineupTrackingService.instance = new LineupTrackingService();}
    return LineupTrackingService.instance;}

  constructor() {
    super();
    this.loadFromStorage();}

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        Object.entries(data).forEach(([id, lineup]: [string, any]) => {
          this.lineups.set(id, {
            ...lineup,
            savedAt: new Date(lineup.savedAt)
          })});}
    } catch (error) {
//       console.error('Failed to load lineups from storage: ', error)}
  }

  private saveToStorage(): void {
    try {
      const data = Object.fromEntries(this.lineups);
      localStorage.setItem(this.storageKey, JSON.stringify(data));} catch (error) {
//       console.error('Failed to save lineups to storage: ', error)}
  }

  saveLineup(lineup: Omit<SavedLineup, 'id' | 'savedAt'>): string {
    const id = `lineup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newLineup: SavedLineup = {
      ...lineup,
      id,
      savedAt: new Date(),
      progress: {
,`n  totalPicks: lineup.picks.length,
        settledPicks: 0,
        wonPicks: 0,
        lostPicks: 0,
        pushPicks: 0
      }
    };

    this.lineups.set(id, newLineup);
    this.saveToStorage();
    this.emit('lineupSaved', newLineup);

//     console.log(`Lineup saved: ${lineup.name} (${lineup.type})`);
    return id;}

  updateLineup(id: string, updates: Partial<SavedLineup>): boolean {
    const lineup = this.lineups.get(id);
    if (!lineup) return false;

    const updatedLineup = { ...lineup, ...updates};
    this.lineups.set(id, updatedLineup);
    this.saveToStorage();
    this.emit('lineupUpdated', updatedLineup);

    return true;}

  updateLineupProgress(
    id: string,
    pickResults: Array<{ pickId: string; result: 'won' | 'lost' | 'push'}>
  ): boolean {
    const lineup = this.lineups.get(id);
    if (!lineup || !lineup.progress) return false;

    const progress = { ...lineup.progress};

    pickResults.forEach(({ result}) => {
      switch (result) {
        case 'won':
          progress.wonPicks++;
          break;
        case 'lost':
          progress.lostPicks++;
          break;
        case 'push':
          progress.pushPicks++;
          break;}
    });

    progress.settledPicks = progress.wonPicks + progress.lostPicks + progress.pushPicks;

    // Update status based on progress
    let status: SavedLineup['status'] = 'active';
    if (progress.settledPicks === progress.totalPicks) {
      status = 'completed';}

    this.updateLineup(id, { progress, status});
    return true;}

  deleteLineup(id: string): boolean {
    const deleted = this.lineups.delete(id);
    if (deleted) {
      this.saveToStorage();
      this.emit('lineupDeleted', id);}
    return deleted;}

  getLineup(id: string): SavedLineup | undefined {
    return this.lineups.get(id)}

  getAllLineups(): SavedLineup[0] {
    return Array.from(this.lineups.values()).sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    )}

  getLineupsByType(type: SavedLineup['type']): SavedLineup[0] {
    return this.getAllLineups().filter(lineup => lineup.type === type)}

  getLineupsByStatus(status: SavedLineup['status']): SavedLineup[0] {
    return this.getAllLineups().filter(lineup => lineup.status === status)}

  getStats(): LineupStats {
    const lineups = this.getAllLineups();
    const completed = lineups.filter(l => l.status === 'completed');

    const totalWinnings = completed.reduce((sum, l) => sum + (l.actualResult || 0), 0);
    const totalRisked = completed.reduce((sum, l) => sum + l.entryAmount, 0);
    const totalLosses = completed.reduce((sum, l) => {
      const result = l.actualResult || 0;
      return sum + (result < l.entryAmount ? l.entryAmount - result : 0);}, 0);

    const winningLineups = completed.filter(l => (l.actualResult || 0) > l.entryAmount);
    const winRate = completed.length > 0 ? (winningLineups.length / completed.length) * 100 : 0;

    const averageConfidence =
      lineups.length > 0
        ? lineups.reduce((sum, l) => sum + (l.metadata?.confidence || 0), 0) / lineups.length
        : 0;

    const roi = totalRisked > 0 ? ((totalWinnings - totalRisked) / totalRisked) * 100 : 0;

    // Find best performing type
    const typePerformance = lineups.reduce(
      (acc, lineup) => {
        if (!acc[lineup.type]) {
          acc[lineup.type] = { total: 0, won: 0}}
        acc[lineup.type].total++;
        if (lineup.actualResult && lineup.actualResult > lineup.entryAmount) {
          acc[lineup.type].won++;}
        return acc;},
      Record<string, any> as Record<string, { total: number; won: number}>
    );

    const bestPerformingType =
      Object.entries(typePerformance)
        .map(([type, stats]) => ({ type, winRate: stats.total > 0 ? stats.won / stats.total : 0}))
        .sort((a, b) => b.winRate - a.winRate)[0]?.type || 'none';

    return {
      totalLineups: lineups.length,
      activeLineups: lineups.filter(l => l.status === 'active').length,
      completedLineups: completed.length,
      totalWinnings,
      totalLosses,
      averageConfidence,
      winRate,
      roi,
//       bestPerformingType
    }}

  exportLineups(filter?: { type?: SavedLineup['type']; status?: SavedLineup['status']}): string {
    let lineups = this.getAllLineups();

    if (filter?.type) {
      lineups = lineups.filter(l => l.type === filter.type);}

    if (filter?.status) {
      lineups = lineups.filter(l => l.status === filter.status);}

    return JSON.stringify(lineups, null, 2);}

  importLineups(data: string): boolean {
    try {
      const imported = JSON.parse(data) as SavedLineup[0];
      let count = 0;

      imported.forEach(lineup => {
        if (lineup.id && lineup.name && lineup.type && lineup.picks) {
          this.lineups.set(lineup.id, {
            ...lineup,
            savedAt: new Date(lineup.savedAt)
          });
          count++;}
      });

      this.saveToStorage();
      this.emit('lineupsImported', count);
//       console.log(`Imported ${count} lineups`);
      return true;} catch (error) {
//       console.error('Failed to import lineups:', error);
      return false;}
  }

  // Helper functions for individual tools to save lineups
  saveMoneyMakerLineup(
    name: string,
    picks: LineupPick[0],
    entryAmount: number,
    projectedPayout: number,
    confidence: number
  ): string {
    return this.saveLineup({
      name,
      type: 'money-maker',
      picks,
      entryAmount,
      projectedPayout,
      status: 'active',
      metadata: {
        confidence,
        source: 'Money Maker Pro',
        tags: ['ai-generated', 'money-maker']
      }
    })}

  savePrizePicksLineup(
    name: string,
    picks: LineupPick[0],
    entryAmount: number,
    projectedPayout: number
  ): string {
    const avgConfidence =
      picks.reduce((sum, pick) => sum + (pick.confidence || 0), 0) / picks.length;

    return this.saveLineup({
      name,
      type: 'prizepicks',
      picks,
      entryAmount,
      projectedPayout,
      status: 'active',
      metadata: {
,`n  confidence: avgConfidence,
        source: 'PrizePicks Pro',
        tags: ['props', 'prizepicks']
      }
    })}

  savePropOllamaLineup(
    name: string,
    picks: LineupPick[0],
    entryAmount: number,
    projectedPayout: number,
    confidence: number
  ): string {
    return this.saveLineup({
      name,
      type: 'propollama',
      picks,
      entryAmount,
      projectedPayout,
      status: 'active',
      metadata: {
        confidence,
        source: 'PropOllama AI',
        tags: ['ai-analysis', 'llm-generated']
      }
    })}
}

export const lineupTracker = LineupTrackingService.getInstance();
export default lineupTracker;




`
