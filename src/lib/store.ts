import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { debounce } from 'lodash-es'

interface GameState {
  totalHats: number
  clicks: number
  upgrades: {
    jacek: number
    hat: number
    crypto: number
  }
  lastCollect: number
  version: number
}

interface GameActions {
  handleClick: () => void
  purchaseUpgrade: (tier: keyof GameState['upgrades']) => void
  calculateAutoProduction: () => Big
}

const store = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      totalHats: 0,
      clicks: 0,
      upgrades: { jacek: 0, hat: 0, crypto: 0 },
      lastCollect: Date.now(),
      version: 1,
      
      handleClick: debounce(() => {
        set({
          clicks: get().clicks + 1,
          totalHats: get().totalHats + 1 + get().calculateAutoProduction()
        })
      }, 100, { leading: true, trailing: false }),
      
      handleClick: () => set({
        clicks: get().clicks + 1,
        totalHats: get().totalHats + 1 + get().calculateAutoProduction()
      }),
      
      purchaseUpgrade: (tier) => set((state) => {
        const cost = Math.floor(10 * Math.pow(1.5, state.upgrades[tier]))
        return {
          totalHats: state.totalHats - cost,
          upgrades: {
            ...state.upgrades,
            [tier]: state.upgrades[tier] + 1
          }
        }
      }),
      
      calculateAutoProduction: () => {
        const { jacek, hat, crypto } = get().upgrades
        return new Big(jacek * 2).plus(hat * 5).plus(crypto * 20)
      },
      addHats: (amount: number) => set(state => ({
        totalHats: state.totalHats + amount
      }))
    }),
    {
      name: 'degens-clicker-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) { // Example migration
          return { ...persistedState as GameState, version: 1 }
        }
        return persistedState as GameState & GameActions
      }
    }
  )
)

export const useStore = store
