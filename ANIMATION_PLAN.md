# NosoScan Animation Implementation Plan

## Assets Available
Located in `brats_visualisation/`:
- 3 BRATS scan examples (choose one to use consistently)
- Ground truth segmentation masks
- Various scan modalities (T1, T2, FLAIR, etc.)

## GSAP Capabilities
- GSAP 3.x with premium plugins (free as of 2025)
- Available plugins: ScrollTrigger, DrawSVG, MorphSVG, MotionPathPlugin
- Canvas/WebGL integration support

## Implementation Phases

### Phase 2: Animation Concepts (Current Focus)

#### ✅ Section 2: "Why NosoScan Works Differently"
**Status:** ✅ ROUGH COMPLETE
**File:** `components/sections/NosoScanScrollSections.tsx` (integrated)
**Animation:** Cellular Automaton Wave Propagation
- [x] Set up section structure with BRATS scan display
- [x] Implement seed pulse animation (0.5s)
- [x] Create wave propagation effect (2-3s)
- [x] Add constraint overlays (30%, 60%, 90%)
- [x] Final segmentation lock-in
- [x] Add labels: "Biology guides / Physics informs / AI supports"

**Technical Approach:**
- Canvas-based particle system
- Use ground truth mask as boundary
- GSAP timeline for coordination
- Color gradient: red (center) → yellow (edge)

**⚠️ Needs refinement:** Animation works but could be improved

---

#### ✅ Transition 2→3: Scroll Pin
**Status:** ✅ COMPLETE
**File:** `components/sections/NosoScanScrollSections.tsx`
- [x] GSAP ScrollTrigger with pin
- [x] Text crossfade on scroll
- [x] Visualization stays pinned

---

#### ✅ Section 3: "Built for Transparency"
**Status:** ✅ ROUGH COMPLETE
**File:** `components/sections/NosoScanScrollSections.tsx`
**Animation:** Traceability Branch Network
- [x] SVG branch paths
- [x] Basic animation loop
- [x] Labels and descriptions

**⚠️ Simplified:** Branch network needs enhancement

---

#### ✅ Transition 3→4
**Status:** ✅ COMPLETE
**File:** `components/sections/NosoScanScrollSections.tsx`
- [x] Scroll-based transition
- [x] Text crossfade

---

#### ✅ Section 4: "Features"
**Status:** ✅ ROUGH COMPLETE
**File:** `components/sections/FeaturesShowcase.tsx`
**Animation:** Multi-Feature Showcase
- [x] 3D Reconstruction (Three.js/R3F)
- [x] Uncertainty Map overlay (wireframe)
- [x] Subregion breakdown (exploded spheres)
- [x] Quantitative metrics (count-up animation)
- [x] Interactive orbit controls

**Technical:**
- Three.js + React Three Fiber
- GSAP for sequencing
- Auto-rotate + manual controls

---

#### ⏸️ Transition 4→5
**Status:** NOT STARTED

---

#### ⏸️ Section 5: "Built for Hospitals"
**Status:** NOT STARTED
**File:** `components/sections/HospitalSection.tsx`
**Animation:** Point Cloud Comparison
- [ ] 100,000 particle cloud
- [ ] Condensation animation
- [ ] Counter: 100M → 30K
- [ ] Side-by-side comparison

---

#### ⏸️ Transition 5→Contact
**Status:** NOT STARTED

---

## Current Status
✅ **Sections 2, 3, 4 implemented (rough)**
- `NosoScanScrollSections.tsx` - Handles sections 2-3 with scroll pinning
- `FeaturesShowcase.tsx` - Handles section 4 with Three.js
- All integrated into main page
- Ready for testing

## Selected Assets
- BRATS scan: TBD (will select first available)
- Ground truth mask: TBD (corresponding to scan)

## Notes
- All sections need responsive design
- Ensure smooth transitions between sections
- Test performance on various devices
- Maintain accessibility standards
