'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function ParallaxImage({ src, alt, width, height, className, style, speed = 0.12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const scale = 1 + speed * 2;

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <motion.div style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </motion.div>
    </div>
  );
}
