import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UpgradeLevels {
  jacek: number
  hat: number
  crypto: number
}

interface StoreState {
  hats: number
  clicks: number
  upgrades: UpgradeLevels
  lastCollection: number
  handleClick: () => void
  purchaseUpgrade: (tier: keyof UpgradeLevels) => void
  calculateAutoProduction: () => number
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      hats: 0,
      clicks: 0,
      upgrades: { jacek: 0, hat: 0, crypto: 0 },
      lastCollection: Date.now(),
      
      handleClick: () => {
        set(state => ({
          hats: state.hats + 1,
          clicks: state.clicks + 1
        }))
      },
      
      purchaseUpgrade: (tier) => {
        const cost = get().calculateUpgradeCost(tier)
        if (get().hats < cost) return
        
        set(state => ({
          hats: state.hats - cost,
          upgrades: {
            ...state.upgrades,
            [tier]: state.upgrades[tier] + 1
          }
        }))
      },
      
      calculateAutoProduction: () => {
        const { jacek, hat, crypto } = get().upgrades
        return (jacek * 1) + (hat * 5) + (crypto * 25)
      },
      
      calculateUpgradeCost: (tier: keyof UpgradeLevels) => {
        const level = get().upgrades[tier]
        return Math.floor(10 * Math.pow(1.5, level))
      }
    }),
    {
      name: 'degen-clicker-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage)
    }
  )
)
