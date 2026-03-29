# Personal Portfolio — Sohan Bendre

A mathematical design-focused personal portfolio built with React, Three.js (React Three Fiber), and Tailwind CSS.

---

## Landing page: Julia set (GPU escape-time)

The home page background is a deterministic Julia-set visualization: color comes from escape-time (iteration count at bailout) plus a time-driven palette in a mid band, with cursor-based mixing toward a dimmed base.

### Mathematical core

- **Map:** $f(z) = z^2 + c$, iterated as $z \leftarrow z^2 + c$ with $z = x + iy$ stored as two floats $(z_x, z_y)$
- **Parameter $c$:** I use $c \approx -0.5125 + 0.5213i$
- **Per-pixel start:** UVs are scaled by $s = 1.45$, rotated into the complex plane:  
  $c_x = (u-0.5)s + (v-0.5)s$, $c_y = -(u-0.5)s + (v-0.5)s$, then $z \leftarrow (c_x, c_y)$.

### Escape-time algorithm (fragment shader)

Implemented inline in `src/components/JuliaSetScene.tsx` (GLSL):

1. Initialize $(z_x, z_y)$ from the mapped UVs above.
2. **Loop** (hard cap 128 steps): if $z_x^2 + z_y^2 > 4$, **break** (escape; bailout radius 2, test uses $|z|^2 > 4$).
3. Otherwise apply one complex step:

$$
z \leftarrow z^2 + c
$$

i.e.

$$
\begin{aligned}
t_x &= z_x^2 - z_y^2 + c_x \\
z_y &= 2 z_x z_y + c_y \\
z_x &= t_x
\end{aligned}
$$

4. **Escape-time** `iter` is the number of completed iterations (0 if immediate escape).
5. **Normalized index** $t = \texttt{iter} / \texttt{uMaxIter}$ with **`uMaxIter = 96`** (normalization only; loop still stops at escape or 128).

Points with `iter` near max are treated as interior / non-escaping in the shading path.

### Escape-time coloring (piecewise mapping)

Let $t = \texttt{iter} / \texttt{uMaxIter}$. The shader maps $t$ to RGB and alpha in bands:

| $t$ range | Role |
|-----------|------|
| $t < 0.02$ | Transparent (skip). |
| $0.02 \leq t < 0.08$ | **First color** edge accent, low alpha ramp. |
| $0.08 \leq t < 0.35$ | Blend from black to first color; alpha builds. |
| $0.35 \leq t < 0.65$ | Blend **first color** → **`cycleColor(uTime * 0.125)`** (animated band). |
| $0.65 \leq t \leq 1$ | Blend animated color → **second color** interior. |
| `iter >= uMaxIter - 1` | **Cream** interior highlight (full brightness). |

A separate **brightness** scale `bright = 0.4 + 0.6 * smoothstep(0.08, 0.2, t)` modulates the result before the hover mix (interiorcream forces `bright = 1.0`).

### Rendering pipeline

- **React Three Fiber** `<Canvas>`: perspective camera $(0,0,1)$, `fov: 50`, **clear alpha 0**.
- **Two** `mesh` planes (`FractalWithTrail`): same $c$ and uniforms, positions **top-left** and **bottom-right** corners of the view (`[-0.4, 0.5, 0]` and `[0.42, -0.35, 0]`), each **`planeGeometry` 1.1×1.1**.
- **Material:** `ShaderMaterial` with **transparent: true**, **depthWrite: false**, **fragment** escape loop as above.
- **Vertex shader:** passes **NDC** `vNDC` (clip.xy / clip.w) for pointer/trail distance tests in **screen-normalized** space.

### Code map

| File | Role |
|------|------|
| `src/components/JuliaSetScene.tsx` | Canvas, trail logic, shader uniforms, fragment escape + color + hover. |
| `src/lib/julia-set.ts` | Shared $c$, complex helpers, optional CPU escape-time / Gaussian grid (not used by the live shader). |

---

## Tech stack

- **App:** React, Vite, TypeScript, React Router
- **3D:** Three.js, React Three Fiber (`@react-three/fiber`)
- **Styling:** Tailwind CSS, shadcn/ui, Radix UI

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
</think>


