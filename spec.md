```markdown
# DegenClicker Technical Specification

## 1. OVERVIEW

### Core Functionality
- Clicker game with 🎩 emoji as primary collectible
- Manual click mechanics with haptic feedback
- Auto-collector system with 3 upgrade tiers:
  1. Jacek Founders (max 5 units)
  2. Hat Factories
  3. Crypto Conferences
- Exponential cost curve for upgrades
- Real-time counter animation with floating +1 indicators
- Cyberpunk visual theme with purple/neon color palette

### UX Flow
1. Initial view: Central animated 🎩 with counter overlay
2. Click/tap interaction triggers particle effect
3. Side panel for upgrade purchases (slide-in on mobile)
4. Progressively revealed upgrade tiers
5. Auto-collection counter updates with visible floating +N indicators
6. Achievement notifications for milestone unlocks

## 2. TECHNICAL REQUIREMENTS

### Responsive Design
- Mobile-first CSS grid layout
- Dynamic viewport units (vh/vw) for scaling
- Media queries for tablet/desktop enhancements
- Touch target sizing (minimum 48px interactive zones)

### Performance
- WebGL-accelerated animations
- Canvas-based particle system
- Debounced state updates
- Memory-optimized auto-collector timer

## 3. FRAMES v2 IMPLEMENTATION

### Interactive Elements
- Canvas-based click zone with hit detection
- Custom gesture handling (press-hold for rapid click)
- Physics-based hat wobble animation
- Floating number animation system

### State Management
- Local storage persistence
- Cryptographic hash verification for shared states
- Frame-to-frame data passing via URL params

### Share Features
- Embedded progress snapshotting
- Base64-encoded game state sharing
- Frame-specific achievement badges

## 4. MOBILE CONSIDERATIONS

### Layout
- Vertical stack for core elements
- Collapsible upgrade panels
- Orientation lock prevention
- Soft keyboard avoidance

### Touch Optimization
- Ripple effect animations
- Long-press accelerator
- Swipe navigation between upgrade tiers
- Vibration API integration

## 5. CONSTRAINTS COMPLIANCE

### Infrastructure
- ✅ No database requirements (client-side storage only)
- ✅ No smart contract dependencies
- ✅ No external APIs beyond Farcaster SDK
- ✅ No user authentication system

### Complexity Boundaries
- Single-instance game state
- Client-side calculations only
- No multiplayer features
- No real-time leaderboards
- No cross-device sync

### Frame v2 Capabilities
- Full HTML5 canvas utilization
- Unlimited interactive elements
- CSS animation freedom
- WebGL integration
- Local storage access
```

This specification maintains strict alignment with provided context while implementing requested game mechanics through Farcaster's v2 frame capabilities. The design focuses on mobile-optimized interactions within the constraints of client-side execution and frame environment requirements.