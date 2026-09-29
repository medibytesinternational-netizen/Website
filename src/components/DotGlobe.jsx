import { useEffect, useRef } from 'react';
import { useMotionOK } from './features/motion';
import '../dot-globe.css';

/*
 * Rotating dotted globe (canvas, no library). Land is a grid of dots kept only
 * where it falls inside rough continent outlines; a hub at Chennai sends arcs
 * with travelling pulses to other Indian cities. Decorative: the outlines are
 * deliberately coarse, and the arcs illustrate "one hub", not customers.
 */

// [lon, lat] outlines, simplified by hand.
const LAND = [
  // North America
  [[-168, 65], [-140, 70], [-95, 72], [-80, 63], [-65, 60], [-55, 50], [-70, 43], [-76, 35], [-81, 25],
    [-97, 26], [-97, 18], [-87, 15], [-78, 8], [-83, 9], [-105, 20], [-117, 32], [-124, 40], [-125, 49],
    [-135, 58], [-150, 60], [-165, 55]],
  // Greenland
  [[-50, 60], [-42, 60], [-20, 70], [-20, 80], [-60, 82], [-72, 77], [-55, 70]],
  // South America
  [[-78, 8], [-60, 10], [-50, 0], [-35, -7], [-40, -22], [-48, -28], [-58, -38], [-65, -55], [-72, -50],
    [-73, -38], [-71, -18], [-81, -5]],
  // Europe
  [[-10, 36], [-9, 43], [-2, 48], [-5, 58], [5, 62], [15, 69], [28, 71], [40, 67], [45, 55], [40, 45],
    [28, 41], [23, 36], [12, 38], [3, 43], [-5, 36]],
  // Britain
  [[-5, 50], [1, 51], [0, 54], [-3, 58], [-6, 57], [-5, 54]],
  // Africa
  [[-17, 15], [-17, 21], [-10, 30], [-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12],
    [40, -2], [40, -15], [33, -26], [20, -35], [15, -28], [12, -17], [9, -1], [5, 5], [-8, 4]],
  // Madagascar
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  // Asia
  [[26, 41], [36, 36], [35, 31], [43, 13], [52, 16], [57, 22], [57, 26], [62, 25], [67, 24], [73, 20],
    [77, 8], [80, 13], [81, 16], [88, 22], [92, 21], [98, 16], [100, 6], [104, 1], [104, 10], [109, 12],
    [106, 20], [110, 21], [117, 24], [122, 30], [122, 40], [128, 38], [130, 43], [140, 48], [142, 53],
    [155, 58], [163, 61], [180, 66], [180, 72], [140, 74], [110, 77], [75, 73], [60, 70], [45, 68],
    [40, 67], [45, 55], [40, 45], [28, 41]],
  // Sri Lanka
  [[80, 6], [82, 7], [81, 9.5], [79.8, 9]],
  // Japan
  [[130, 31], [135, 34], [140, 36], [142, 40], [141, 45], [144, 43], [140, 41], [139, 35], [132, 33]],
  // Maritime South-East Asia
  [[95, 5], [105, -6], [115, -8], [120, -9], [125, -9], [119, -5], [117, 5], [109, 2], [100, 2]],
  // Australia
  [[114, -22], [114, -34], [122, -34], [131, -31], [138, -35], [146, -39], [150, -37], [153, -28],
    [153, -25], [146, -19], [142, -11], [136, -12], [130, -12], [122, -17]],
  // New Zealand
  [[172, -34], [178, -38], [174, -41], [167, -46], [170, -44], [173, -40]],
];

const HUB = [13.08, 80.27]; // Chennai [lat, lon]
const NODES = [
  [19.07, 72.87], // Mumbai
  [28.61, 77.21], // Delhi
  [22.57, 88.36], // Kolkata
  [17.38, 78.48], // Hyderabad
  [12.97, 77.59], // Bengaluru
  [9.93, 76.26], // Kochi
  [26.85, 80.95], // Lucknow
];

const TILT = 0.32; // radians: north leans toward the viewer
const SPEED = 0.00016; // radians per ms (~40 s per turn)
const START = -1.45; // initial rotation: India in view

function inPoly([x, y], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const toVec = (lat, lon) => {
  const p = (lat * Math.PI) / 180;
  const l = (lon * Math.PI) / 180;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
};

/** Evenly spaced dots: land at full density, ocean as a sparser, fainter grid. */
function buildDots() {
  const land = [];
  const sea = [];
  const step = 2.4;
  for (let lat = -84; lat <= 84; lat += step) {
    const lonStep = step / Math.max(Math.cos((lat * Math.PI) / 180), 0.12);
    let k = 0;
    for (let lon = -180; lon < 180; lon += lonStep, k++) {
      const onLand = lat > -60 && LAND.some((poly) => inPoly([lon, lat], poly));
      if (onLand) land.push(toVec(lat, lon));
      else if (k % 2 === 0) sea.push(toVec(lat, lon));
    }
  }
  return { land, sea };
}

/** Great-circle points from a to b, lifted off the surface in the middle. */
function arc(a, b, n = 40) {
  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const w = Math.acos(Math.min(1, Math.max(-1, dot)));
  const s = Math.sin(w) || 1;
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const k1 = Math.sin((1 - t) * w) / s;
    const k2 = Math.sin(t * w) / s;
    const lift = 1 + Math.sin(Math.PI * t) * (0.1 + w * 1.5);
    out.push([(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift]);
  }
  return out;
}

export default function DotGlobe({ className = '', label }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const motionOK = useMotionOK();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !ctx) return;

    const { land, sea } = buildDots();
    const hub = toVec(...HUB);
    const nodes = NODES.map((n) => toVec(...n));
    const arcs = nodes.map((n) => arc(hub, n));

    let size = 0;
    let angle = START;
    let raf = 0;
    let last = 0;
    let visible = true;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const project = (v, ca, sa, R, c) => {
      const x = v[0] * ca + v[2] * sa;
      const z1 = -v[0] * sa + v[2] * ca;
      const y = v[1] * cosT - z1 * sinT;
      const z = v[1] * sinT + z1 * cosT;
      return [c + x * R, c - y * R, z];
    };

    const draw = (t) => {
      const c = size / 2;
      const R = size * 0.44;
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      const unit = size / 420;
      ctx.clearRect(0, 0, size, size);

      // Sphere body: soft fill + hairline edge.
      const g = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      g.addColorStop(0, 'rgba(255,255,255,0.9)');
      g.addColorStop(1, 'rgba(179,217,255,0.28)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(47,90,168,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Ocean grid: tiny, faint squares so the sphere never reads as empty.
      ctx.fillStyle = 'rgba(47,90,168,0.22)';
      const sq = 1.5 * unit;
      for (const p of sea) {
        const q = project(p, ca, sa, R, c);
        if (q[2] < 0.05) continue;
        ctx.fillRect(q[0] - sq / 2, q[1] - sq / 2, sq, sq);
      }

      // Land dots, bucketed by depth so each bucket is one path.
      const buckets = Array.from({ length: 6 }, () => []);
      for (const p of land) {
        const q = project(p, ca, sa, R, c);
        if (q[2] < -0.15) continue;
        const b = Math.min(5, Math.max(0, Math.floor((q[2] + 0.15) * 5.2)));
        buckets[b].push(q);
      }
      buckets.forEach((pts, b) => {
        if (!pts.length) return;
        ctx.fillStyle = `rgba(47,90,168,${0.12 + b * 0.15})`;
        ctx.beginPath();
        const r = (0.9 + b * 0.22) * unit;
        for (const q of pts) {
          ctx.moveTo(q[0] + r, q[1]);
          ctx.arc(q[0], q[1], r, 0, Math.PI * 2);
        }
        ctx.fill();
      });

      // Arcs + travelling pulses (front side only).
      ctx.lineWidth = 1.2 * unit;
      arcs.forEach((pts, i) => {
        const proj = pts.map((p) => project(p, ca, sa, R, c));
        ctx.beginPath();
        let drawing = false;
        for (const q of proj) {
          if (q[2] > 0) {
            if (drawing) ctx.lineTo(q[0], q[1]);
            else ctx.moveTo(q[0], q[1]);
            drawing = true;
          } else drawing = false;
        }
        ctx.strokeStyle = 'rgba(47,90,168,0.55)';
        ctx.stroke();

        const phase = ((t / 2200 + i * 0.37) % 1 + 1) % 1;
        const q = proj[Math.floor(phase * (proj.length - 1))];
        if (q[2] > 0) {
          ctx.fillStyle = '#2F5AA8';
          ctx.beginPath();
          ctx.arc(q[0], q[1], 2.2 * unit, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // City nodes.
      nodes.forEach((n) => {
        const q = project(n, ca, sa, R, c);
        if (q[2] <= 0) return;
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#2F5AA8';
        ctx.lineWidth = 1.4 * unit;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 2.6 * unit, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Hub with a breathing ring.
      const h = project(hub, ca, sa, R, c);
      if (h[2] > 0) {
        const pulse = (t / 1800) % 1;
        ctx.strokeStyle = `rgba(47,90,168,${0.5 * (1 - pulse)})`;
        ctx.lineWidth = 1.5 * unit;
        ctx.beginPath();
        ctx.arc(h[0], h[1], (5 + pulse * 16) * unit, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#1E3F7A';
        ctx.beginPath();
        ctx.arc(h[0], h[1], 4.2 * unit, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const w = wrap.getBoundingClientRect().width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${w}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const loop = (t) => {
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      angle += dt * SPEED;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!motionOK || !visible || raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [motionOK]);

  return (
    <div
      ref={wrapRef}
      className={`dot-globe ${className}`}
      role="img"
      aria-label={
        label ??
        'Illustration: a rotating dotted globe with a hub in Chennai connected to cities across India.'
      }
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
