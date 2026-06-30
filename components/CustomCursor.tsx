'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* track exact cursor position for the dot */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    /* lag the ring behind the dot */
    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      rafId = requestAnimationFrame(tick);
    };

    /* hover state for links / buttons */
    const onEnter = () => {
      ring.style.scale = '1.6';
      ring.style.borderColor = 'var(--accent)';
      dot.style.opacity = '0';
    };
    const onLeave = () => {
      ring.style.scale = '1';
      ring.style.borderColor = 'rgba(232,228,220,0.45)';
      dot.style.opacity = '1';
    };

    const bindHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    bindHover();

    const mo = new MutationObserver(bindHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      {/* dot — snaps instantly to cursor */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          background: 'var(--fg)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 99999,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* ring — lags behind with lerp */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 32, height: 32,
          border: '1px solid rgba(232,228,220,0.45)', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 99998,
          transition: 'scale 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
