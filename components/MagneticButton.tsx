'use client';
import { useRef, MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
}

export default function MagneticButton({ children, className, style, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
