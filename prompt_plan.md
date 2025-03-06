```markdown
# Prompt Series for DegenClicker Implementation

## 1. Project Setup and Base Template
```text
Create a Next.js 14 app using TypeScript with the following:
- src/app/layout.tsx with cyberpunk theme (purple/neon CSS variables)
- src/app/page.tsx with main game container div
- Install required packages: zustand, @farcaster/auth-kit, canvas-confetti
- Configure base styles for mobile-first responsive design
- Set up Farcaster Frame metadata in layout
- Create components/GameCanvas.tsx stub
- Initialize public/assets with placeholder hat image
```

## 2. Core Game State Management
```text
Create a store using zustand that tracks:
- Total hats collected
- Manual click count
- Upgrade levels (Jacek/Hat/Crypto)
- Last collection timestamp
Implement actions:
- handleClick()
- purchaseUpgrade(tier)
- calculateAutoProduction()
Add localStorage persistence with versioned schema
Include exponential cost calculation helpers
```

## 3. Canvas Rendering Foundation
```text
Create GameCanvas component with:
- WebGL context initialization
- Responsive sizing (useViewportSizes hook)
- Basic render loop using requestAnimationFrame
- Placeholder hat rendering (static 🎩 emoji)
- Floating number animation system scaffold
- Pointer event handlers stub
Add to main page with CSS positioning
```

## 4. Click Interaction System
```text
Implement canvas click handling:
- Normalized click coordinates
- Particle effect trigger on click
- Haptic feedback (navigator.vibrate)
- Animated hat scale bounce
- Floating +1 number animation
Connect to zustand store:
- Call handleClick on valid tap
- Update DOM counter display
Add click debouncing (100ms min interval)
```

## 5. Upgrade UI Panel System
```text
Create components/UpgradePanel.tsx:
- Slide-in mobile layout (CSS transform)
- Three-tier upgrade display
- Dynamic pricing calculation
- Purchase button handlers
- Progress bar animations
Implement in main page with:
- Conditional rendering based on unlocked tiers
- Collapsible trigger button
- CSS grid layout for desktop
Style with neon borders/glassmorphism effects
```

## 6. Auto-Collector Timer Logic
```text
Add auto-collection system:
- useEffect interval (1s)
- calculateAutoProduction from store
- Animated floating numbers for auto gains
- Optimize timer cleanup
- Memory-efficient calculation (big.js)
Implement visual indicators:
- Production rate display
- Tier activation animations
- Cumulative gains counter
Add pause/resume on visibility change
```

## 7. Particle Effect System
```text
Create components/ParticleEngine.ts:
- Canvas-based particle pool
- Physics-based movement
- Custom draw cycle
- Color gradients (purple/cyan)
- Performance optimizations
Integrate with click handler:
- Spawn particles on click
- Coordinate with WebGL hat
- Mobile-friendly settings
Add configuration presets
```

## 8. State Serialization System
```text
Implement state sharing features:
- Base64 encoding/decoding
- URL parameter serialization
- Cryptographic hash verification
- Snapshot system (current progress)
- Error recovery mechanisms
Add UI components:
- Share button with copy functionality
- Loading state validation
- Version migration handling
Integrate with zustand middleware
```

## 9. Mobile Optimization Pass
```text
Add touch-specific enhancements:
- Ripple effect CSS animations
- Swipe gestures for panels
- Soft keyboard avoidance
- Orientation change guards
- Touch target sizing audit
Implement vibration patterns:
- Short pulse on click
- Long pulse on purchase
- Error feedback pattern
Test with device emulation
```

## 10. Final Integration Pass
```text
Wire all components together:
- Connect store to UI elements
- Sync canvas with state updates
- Finalize animation timing
- Audit performance metrics
- Add error boundaries
Implement loading states:
- Canvas placeholder
- Store hydration loader
- Upgrade panel skeletons
Add final theme polish:
- Neon glow animations
- Cyberpunk font faces
- Sound effect toggles
```
```

Each prompt builds on previous implementations while maintaining isolated testability. The sequence follows:
1. Infrastructure
2. Data Flow
3. Visual Foundation
4. Interaction
5. Progression
6. Automation
7. Feedback
8. Persistence
9. Refinement
10. Unification

Key integration points are explicitly called out in later prompts to ensure system cohesion. Mobile considerations are embedded at each layer with dedicated optimization pass.