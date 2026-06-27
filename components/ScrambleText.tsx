'use client';
import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function ScrambleText({ text, className, style, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let rafId: number;
    const totalFrames = 18;
    const revealPerFrame = text.length / totalFrames;

    const timeoutId = setTimeout(() => {
      const animate = () => {
        const revealed = Math.min(Math.floor(frame * revealPerFrame), text.length);
        let output = '';
        for (let i = 0; i < text.length; i++) {
          if (i < revealed || text[i] === ' ') {
            output += text[i];
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        el.textContent = output;
        frame++;
        if (frame <= totalFrames) {
          rafId = requestAnimationFrame(animate);
        } else {
          el.textContent = text;
        }
      };
      rafId = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}
