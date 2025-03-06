Here's the optimized implementation checklist:

**Foundation Layer**
- [ ] Create Next.js 14 app with TypeScript template and install zustand, @farcaster/auth-kit, canvas-confetti (Project Setup)
- [x] Configure cyberpunk theme CSS variables in layout.tsx with neon purple/cyan gradients (Style Foundation)
- [x] Initialize zustand store with schema v1 including upgrades, clicks, and timestamp (State Core)
- [x] Set up GameCanvas component with WebGL context and responsive viewport hook (Visual Base)
- [x] Implement localStorage persistence middleware with version migration (Data Persistence)

**Core Interactions**
- [x] Create click handler in store with debounce and connect to canvas onClick (Click Logic)
- [ ] Build floating number animation system in GameCanvas (Visual Feedback)
- [ ] Add upgrade panel component with slide-in animation and tier price calculation (Progression UI)
- [ ] Implement auto-collection timer with big.js calculations in useEffect (Passive Income)

**Enhanced Feedback**
- [ ] Create particle engine with pool management and purple/cyan gradients (Particle System)
- [ ] Add haptic feedback patterns for clicks/purchases (Mobile UX)
- [ ] Implement state serialization/deserialization with URL params (Sharing)

**Polish & Mobile**
- [ ] Configure Farcaster Frame metadata in layout headers (Social Integration)
- [ ] Add touch-optimized swipe gestures for upgrade panel (Mobile Controls)
- [ ] Implement orientation change handler with canvas resize (Responsive)

**Final Integration**
- [ ] Connect store values to DOM counters in page.tsx (State Sync)
- [ ] Add performance optimizations using React.memo (Render Efficiency)
- [ ] Implement error boundaries for canvas/store operations (Resilience)
- [ ] Add cyberpunk font-face and final glow animations (Theme Polish)
- [ ] Create production build test plan with device emulation (QA)

Dependency order flows vertically through groups. Each task represents ~1-2 hours of focused work with clear completion criteria. The list covers all key aspects from the prompt while maintaining technical cohesion.
