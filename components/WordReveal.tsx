'use client';
import { useRef } from 'react';
import React from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface Props {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  as?: string;
}

export default function WordReveal({ children, className, style, delay = 0, as: Tag = 'p' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const words = children.split(' ');

  const Wrapper = Tag as React.ElementType;

  return (
    <Wrapper ref={ref} className={className} style={{ ...style, lineHeight: style?.lineHeight ?? 'inherit' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block', marginRight: '0.28em' }}
            initial={reduce ? false : { y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.055,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
