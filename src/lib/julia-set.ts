/**
 * Julia–Fatou Set: Complex number math and point generation utilities.
 *
 * Mathematical basis:
 * - Quadratic map: f(z) = z² + c
 * - Julia set: boundary of the set of points that do not escape under iteration
 * - Fatou set: points that escape (exterior) or converge (interior)
 *
 * Reference: c ≈ -0.5125 + 0.5213i (Wikipedia: Julia set)
 */

export interface Complex {
  re: number;
  im: number;
}

export const C_DEFAULT: Complex = { re: -0.5125, im: 0.5213 };

/** Add two complex numbers */
export function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

/** Multiply two complex numbers */
export function mul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

/** Square: z² */
export function sq(z: Complex): Complex {
  return mul(z, z);
}

/** Modulus squared: |z|² (avoids sqrt for escape check) */
export function modSq(z: Complex): number {
  return z.re * z.re + z.im * z.im;
}

/** Modulus: |z| */
export function mod(z: Complex): number {
  return Math.sqrt(modSq(z));
}

/** Escape-time algorithm: iterate f(z) = z² + c until |z| > 2.
 * Returns iteration count at escape (0 = escaped immediately).
 */
export function escapeTime(z: Complex, c: Complex, maxIter: number = 256): number {
  let z0 = { ...z };
  for (let i = 0; i < maxIter; i++) {
    if (modSq(z0) > 4) return i;
    z0 = add(sq(z0), c);
  }
  return maxIter; // did not escape (in Julia set)
}

/** Box-Muller transform: sample from standard normal */
function gaussian(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  if (u1 === 0) return gaussian();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/** Add Gaussian offset to a point (stochastic "bleeding ink" effect) */
export function addGaussianOffset(
  x: number,
  y: number,
  sigma: number = 0.008
): { x: number; y: number } {
  return {
    x: x + sigma * gaussian(),
    y: y + sigma * gaussian(),
  };
}

export interface JuliaPoint {
  x: number;
  y: number;
  iteration: number;
  maxIter: number;
}

/** Generate points using escape-time on a grid.
 * Bounds match reference: Re(z) [-1.5, 1.5], Im(z) [-1.0, 1.0].
 * minIterThreshold: skip points that escape immediately (sparser, painterly look).
 */
export function generateJuliaPoints(
  c: Complex,
  gridRes: number = 120,
  maxIter: number = 256,
  sigma: number = 0.012,
  minIterThreshold: number = 2,
  bounds: { xMin: number; xMax: number; yMin: number; yMax: number } = {
    xMin: -1.5,
    xMax: 1.5,
    yMin: -1.0,
    yMax: 1.0,
  }
): JuliaPoint[] {
  const points: JuliaPoint[] = [];
  const dx = (bounds.xMax - bounds.xMin) / (gridRes - 1);
  const dy = (bounds.yMax - bounds.yMin) / (gridRes - 1);

  for (let i = 0; i < gridRes; i++) {
    for (let j = 0; j < gridRes; j++) {
      const x0 = bounds.xMin + i * dx;
      const y0 = bounds.yMin + j * dy;
      const iter = escapeTime({ re: x0, im: y0 }, c, maxIter);

      if (iter < minIterThreshold) continue;

      const { x, y } = addGaussianOffset(x0, y0, sigma);
      points.push({ x, y, iteration: iter, maxIter });
    }
  }

  return points;
}
