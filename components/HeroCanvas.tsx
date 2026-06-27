'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const hero = canvas.parentElement!;

    const W = hero.offsetWidth || window.innerWidth;
    const H = hero.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000);
    camera.position.z = 68;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x06060a, 1);

    // Grid sized to fill the camera FOV exactly
    // At z=68, FOV=65: visible half-height = tan(32.5°) * 68 ≈ 43, half-width ≈ 43 * (W/H)
    const COLS = 110;
    const ROWS = 62;
    const N = COLS * ROWS;
    const SPREAD_X = 165; // fills horizontal FOV
    const SPREAD_Y = 95;  // fills vertical FOV

    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const sz  = new Float32Array(N);

    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const idx = i * ROWS + j;
        const u = i / (COLS - 1);
        const v = j / (ROWS - 1);
        pos[idx * 3]     = (u - 0.5) * SPREAD_X;
        pos[idx * 3 + 1] = (v - 0.5) * SPREAD_Y;
        pos[idx * 3 + 2] = 0;
        // teal → chartreuse gradient
        col[idx * 3]     = 0.05 + u * 0.68;
        col[idx * 3 + 1] = 0.50 + v * 0.50;
        col[idx * 3 + 2] = 0.60 - u * 0.52;
        sz[idx] = 0.72;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));

    const mat = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vColor = color;
          vec3 p = position;
          vec2 mp = uMouse * 55.0;
          float dist = distance(p.xy, mp);
          float ripple = sin(dist * 0.25 - uTime * 3.0)
                         * max(0.0, 1.0 - dist / 35.0) * 13.0;
          float wave   = sin(p.x * 0.07 + uTime) * cos(p.y * 0.07 + uTime * 0.7) * 5.0;
          p.z = wave + ripple;
          vec4 mvp = modelViewMatrix * vec4(p, 1.0);
          float boost = max(0.0, 1.0 - dist / 24.0);
          gl_PointSize = size * (195.0 / -mvp.z) * (1.0 + boost * 3.0);
          gl_Position  = projectionMatrix * mvp;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = (0.5 - d) * 2.0;
          gl_FragColor = vec4(vColor, a * 0.92);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let time = 0;
    const target = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top)  / rect.height) * 2 - 1);
    };
    hero.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      time += 0.008;
      target.x += (mouseRef.current.x - target.x) * 0.05;
      target.y += (mouseRef.current.y - target.y) * 0.05;
      mat.uniforms.uTime.value  = time;
      (mat.uniforms.uMouse.value as THREE.Vector2).copy(target);
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const w = hero.offsetWidth;
      const h = hero.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      hero.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}
