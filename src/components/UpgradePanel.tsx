"use client";

import { useCallback } from "react";
import { cn } from "~/lib/utils";
import { PurpleButton } from "./ui/PurpleButton";

const UPGRADE_BASE_COST = 10;

const calculateUpgradeCost = (level: number) => 
  Math.floor(UPGRADE_BASE_COST * Math.pow(1.5, level));

export function UpgradePanel({
  levels,
  onUpgrade,
}: {
  levels: [number, number, number];
  onUpgrade: (tier: number) => void;
}) {
  const [jacekLevel, hatLevel, cryptoLevel] = levels;
  const tiers = [
    {
      label: "Jacek Bot",
      level: jacekLevel,
      description: "Auto-clicks every 5s",
    },
    {
      label: "Hat Multiplier", 
      level: hatLevel,
      description: "2x per level",
    },
    {
      label: "Crypto Boost",
      level: cryptoLevel,
      description: "3x blockchain power",
    },
  ];

  const togglePanel = useCallback(() => {
    const panel = document.querySelector("[data-upgrade-panel]");
    panel?.classList.toggle("translate-x-full");
  }, []);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <div className="flex items-center">
        <div 
          data-upgrade-panel
          className="bg-background/80 backdrop-blur-sm p-4 rounded-l-xl border-l-2 border-b-2 border-t-2 border-purple-400 shadow-lg transition-transform duration-300 translate-x-full"
        >
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={tier.label} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-purple-300">{tier.label}</h3>
                    <p className="text-xs text-muted-foreground">{tier.description}</p>
                  </div>
                  <PurpleButton
                    onClick={() => onUpgrade(index)}
                    className="px-3 py-1 text-xs"
                  >
                    {calculateUpgradeCost(tier.level)} ETH
                  </PurpleButton>
                </div>
                {index < tiers.length - 1 && (
                  <div className="h-px bg-purple-400/20" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <PurpleButton
          onClick={togglePanel}
          className="rounded-l-none px-2 py-4"
        >
          ▸
        </PurpleButton>
      </div>
    </div>
  );
}
