'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId: number;
    let enlarged = false;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const loop = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      const hw = enlarged ? 24 : 16;
      ring.style.transform = `translate(${rx - hw}px, ${ry - hw}px)`;
      rafId = requestAnimationFrame(loop);
    };

    const enter = () => {
      enlarged = true;
      ring.style.scale = '1.5';
      ring.style.borderColor = 'var(--accent)';
      dot.style.opacity = '0';
    };

    const leave = () => {
      enlarged = false;
      ring.style.scale = '1';
      ring.style.borderColor = 'rgba(232,228,220,0.45)';
      dot.style.opacity = '1';
    };

    const bindLinks = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };

    document.addEventListener('mousemove', move);
    rafId = requestAnimationFrame(loop);
    bindLinks();

    const observer = new MutationObserver(bindLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999,
          width: 6, height: 6,
          background: 'var(--fg)', borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'opacity 0.15s',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998,
          width: 32, height: 32,
          border: '1px solid rgba(232,228,220,0.45)', borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'scale 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
        }}
      />
    </>
  );
}
