'use client';
import { useRef, MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

export default function TiltCard({ children, className, style, maxTilt = 5 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    inner.style.transform = `perspective(1200px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
  };

  const onMouseLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={wrapRef}
      className={className}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={innerRef}
        style={{ transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
