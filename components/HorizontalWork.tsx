'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ParallaxImage from './ParallaxImage';

const projects = [
  { name: 'Lufthaus', category: 'Brand identity', seed: 'arche-lufthaus', w: 900, h: 600 },
  { name: 'Sena',     category: 'Digital campaign', seed: 'arche-sena',     w: 700, h: 525 },
  { name: 'Velo',     category: 'Product launch',   seed: 'arche-velo',     w: 700, h: 525 },
  { name: 'Noma',     category: 'Motion system',    seed: 'arche-noma',     w: 700, h: 525 },
];

export default function HorizontalWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-65vw']);

  return (
    <section id="work" ref={containerRef} style={{ height: '350vh', position: 'relative' }}>
      {/* sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <motion.div
          style={{
            x,
            display: 'flex',
            alignItems: 'stretch',
            gap: '1px',
            paddingLeft: '5vw',
            paddingRight: '5vw',
            willChange: 'transform',
          }}
        >
          {/* intro label */}
          <div
            style={{
              minWidth: '28vw',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingRight: '4vw',
              paddingBottom: '2rem',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '1.25rem',
              }}
            >
              Selected work
            </p>
            <h2
              style={{
                fontSize: 'clamp(36px, 4.5vw, 58px)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              Projects
              <br />
              that{' '}
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                moved
              </em>
              <br />
              things.
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--muted)',
                marginTop: '1.5rem',
                lineHeight: 1.6,
                maxWidth: '240px',
              }}
            >
              Scroll to explore →
            </p>
          </div>

          {/* project cards */}
          {projects.map((p) => (
            <div
              key={p.name}
              style={{
                minWidth: '38vw',
                flexShrink: 0,
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ParallaxImage
                src={`https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`}
                alt={`${p.name} — ${p.category}`}
                width={p.w}
                height={p.h}
                style={{ flex: 1 }}
                speed={0.06}
              />
              <div
                style={{
                  padding: '1.1rem 1.5rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: '14px' }}>{p.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.category}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
