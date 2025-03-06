# DegenClicker QA Test Plan

## Core Functionality Tests
1. Frame rendering verification:
- [ ] Chrome desktop (1400px+)
- [ ] Safari mobile (375px)
- [ ] Frame embed in Warpcast
- [ ] Frame embed in other clients

2. Wallet interaction scenarios:
- [ ] Connect/disconnect wallet
- [ ] Send test transaction
- [ ] Sign message
- [ ] Sign typed data

3. Game mechanics:
- [ ] Click collection (100+ rapid clicks)
- [ ] Upgrade purchases (all tiers)
- [ ] Auto-collector timing
- [ ] State persistence across reloads
- [ ] Share URL state loading

4. Performance benchmarks:
- [ ] 60FPS maintained during particle effects
- [ ] Memory usage < 500MB after 1hr
- [ ] Load time < 3s on 3G connection

5. Error conditions:
- [ ] Network disconnect recovery  
- [ ] Invalid share URL handling
- [ ] Wallet transaction rejection
- [ ] Frame API failure modes

## Device Matrix
```text
iOS:      iPhone 15 Pro, iPad Pro 12.9"
Android:  Pixel 8 Pro, Galaxy S24 Ultra
Desktop:  Chrome 124, Firefox 125, Safari 17
```
