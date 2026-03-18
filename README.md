# Personal Portfolio — Sohan Bendre

A generative, design-focused personal portfolio built with React, Three.js, and GSAP.

---

## Julia–Fatou Set Landing Page

The landing page features a generative fractal background based on the **Julia set** and **Fatou set** from complex dynamics.

### Mathematical Logic

#### Quadratic Map
- **Function**: \( f(z) = z^2 + c \)
- **Parameter \( c \)**: \( c \approx -0.5125 + 0.5213i \) (from [Wikipedia: Julia set](https://en.wikipedia.org/wiki/Julia_set))
- This \( c \) produces a connected, dendritic Julia set with rich boundary structure.

#### Escape-Time Algorithm
- For each point \( z_0 \) in the complex plane, iterate \( z_{n+1} = z_n^2 + c \).
- **Escape criterion**: \( |z| > 2 \) (bailout radius).
- **Iteration count**: Number of iterations until escape (or `maxIter` if it does not escape).
- Points that never escape lie in the **Julia set**; points that escape lie in the **Fatou set** (exterior).

#### Stochasticity (Bleeding Ink)
- A small **Gaussian offset** (σ ≈ 0.01) is applied to each point’s position.
- Uses Box–Muller transform for normal sampling.
- Produces soft, ink-like edges instead of crisp mathematical boundaries.

### Rendering (Three.js / React Three Fiber)

- **InstancedMesh**: Renders 32,400+ instances (180×180 grid).
- **Geometry**: `PlaneGeometry(1, 1)` per instance.
- **Texture**: `Splat-24.svg` (paint-splatter style icon) from Lucide.
- **Material**: `MeshBasicMaterial` with:
  - `transparent: true`
  - `alphaTest: 0.5`
  - `depthWrite: false` (allows overlapping splats for layered paint effect)
  - `vertexColors: true` (per-instance color from iteration count)

### Aesthetic & Color

- **Color gradient** (Tailwind-inspired: Purple, Orange, Blue):
  - **Fatou (exterior)**: Low iteration count → misty **Purple** (HSL ~0.78), low saturation.
  - **Near boundary**: Medium iteration → **Orange** (HSL ~0.08–0.2).
  - **Julia set (boundary)**: High iteration → saturated **Blue** (HSL ~0.6).
- **Opacity**: Increases with iteration count (boundary more opaque, exterior more transparent).

### Interaction & Animation

1. **Scale-in on load**: GSAP animates instance scale from 0 → 1 with `back.out(1.6)` over 1.2s for a “splatter explosion” from the center.
2. **\( c \) animation**: GSAP slowly animates \( c \) (e.g. \( +0.03 \) in real, \( +0.02 \) in imaginary) over 8s, yoyo repeat. Point regeneration is throttled to every 800ms to balance visual change and performance.

### Code Structure

- **`src/lib/julia-set.ts`**: Complex number math, escape-time, point generation, Gaussian offset.
- **`src/components/JuliaSetScene.tsx`**: React Three Fiber scene, `InstancedMesh`, GSAP animations.
- Math logic is isolated from rendering for easier iteration and testing.

---

## Future: Möbius Strip Experience

Planned: Experience, About, Projects, and Skills will be placed on a Möbius strip in a later step. Components (`MobiusStrip`, `MobiusScene`) are preserved for this.

---

## Tech Stack

- **Framework**: React + Vite
- **3D**: Three.js, React Three Fiber, Drei
- **Animation**: GSAP
- **Styling**: Tailwind CSS
- **UI**: Radix UI, shadcn/ui

---

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
