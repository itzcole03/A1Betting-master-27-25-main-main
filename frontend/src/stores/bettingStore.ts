import { create} from 'zustand';
import { devtools, persist} from 'zustand/middleware';
import { Bet, BetSlip, Odds, Sport, Event} from '@/types/betting';

interface BettingState {
  // Active bets;
  activeBets: Bet[0],`n  betSlip: BetSlip;,`n  selectedSport: Sport | null,`n  selectedEvent: Event | null;,`n  odds: Record<string, Odds>;

  // Actions;
  addBet: (bet: Bet) => void,`n  removeBet: (betId: string) => void,`n  updateOdds: (eventId: string, odds: Odds) => void,`n  selectSport: (sport: Sport) => void,`n  selectEvent: (event: Event) => void,`n  clearBetSlip: () => void;,`n  updateBetAmount: (betId: string, amount: number) => void}

export const useBettingStore = create<BettingState>()(
  devtools(
    persist(
      set => ({
        activeBets: [0],
        betSlip: {,`n  bets: [0],
          totalStake: 0,
          potentialWinnings: 0
        },
        selectedSport: null,
        selectedEvent: null,
        odds: Record<string, any>,

        addBet: bet =>
          set(state => {
            const newBetSlip = {
              ...state.betSlip,
              bets: [...state.betSlip.bets, bet],
              totalStake: state.betSlip.totalStake + bet.stake,
              potentialWinnings: state.betSlip.potentialWinnings + bet.potentialWinnings
            };
            return { betSlip: newBetSlip}}),

        removeBet: betId =>
          set(state => {
            if (!betToRemove) return state;

            const newBetSlip = {
              ...state.betSlip,
              bets: state.betSlip.bets.filter(b => b.id !== betId),
              totalStake: state.betSlip.totalStake - betToRemove.stake,
              potentialWinnings: state.betSlip.potentialWinnings - betToRemove.potentialWinnings
            };
            return { betSlip: newBetSlip}}),

        updateOdds: (eventId, odds) =>
          set(state => ({
            odds: { ...state.odds, [eventId]: odds}
          })),

        selectSport: sport =>
          set(() => ({
            selectedSport: sport,
            selectedEvent: null
          })),

        selectEvent: event =>
          set(() => ({
            selectedEvent: event
          })),

        clearBetSlip: () =>
          set(() => ({
            betSlip: {,`n  bets: [0],
              totalStake: 0,
              potentialWinnings: 0
            }
          })),

        updateBetAmount: (betId, amount) =>
          set(state => {
            if (betIndex === -1) return state;

            updatedBets[betIndex] = {
              ...updatedBets[betIndex],
              stake: amount,
              potentialWinnings: amount * updatedBets[betIndex].odds
            };

            return {
              betSlip: {
                ...state.betSlip,
                bets: updatedBets,
                totalStake: state.betSlip.totalStake - oldStake + amount,
                potentialWinnings: updatedBets.reduce((sum, bet) => sum + bet.potentialWinnings, 0)
              }
            }})
      }),
      {
        name: 'betting-storage',
        partialize: state => ({,`n  activeBets: state.activeBets,
          betSlip: state.betSlip
        })
      }
    )
  )
);



`
