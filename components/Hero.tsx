'use client';
import HeroCanvas from './HeroCanvas';
import WordReveal from './WordReveal';
import MagneticButton from './MagneticButton';
import ScrambleText from './ScrambleText';

export default function Hero() {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: 'calc(100dvh - 64px)', padding: '5rem 2.5rem 4.5rem' }}
    >
      <HeroCanvas />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(6,6,10,0.94) 15%, rgba(6,6,10,0.18) 65%)',
        }}
      />

      <div className="relative z-[2] max-w-[860px]">
        <p
          className="text-[11px] uppercase tracking-[0.2em] mb-8"
          style={{ color: 'var(--muted)' }}
        >
          <ScrambleText text="Motion and spatial design" delay={0.2} />
        </p>

        <h1
          className="glitch font-light leading-[1.06] tracking-[-0.03em] mb-8"
          data-text="We build worlds that actually move."
          style={{ fontSize: 'clamp(44px, 7.5vw, 90px)' }}
        >
          We build worlds
          <br />
          that{' '}
          <em className="not-italic" style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
            actually
          </em>{' '}
          move.
        </h1>

        <WordReveal
          as="p"
          className="text-[15px] font-light leading-[1.7] mb-10"
          style={{ color: 'var(--muted)', maxWidth: '430px' }}
          delay={0.3}
        >
          Interactive experiences and motion systems for brands that refuse to be ordinary.
        </WordReveal>

        <div className="flex gap-3 flex-wrap">
          <MagneticButton>
            <a
              href="#work"
              className="inline-block px-7 py-3 text-[12px] font-medium uppercase tracking-[0.1em] rounded-[2px] transition-opacity duration-200 hover:opacity-80"
              style={{ background: 'var(--accent)', color: '#06060a' }}
            >
              View work
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#studio"
              className="inline-block px-7 py-3 text-[12px] uppercase tracking-[0.1em] rounded-[2px] transition-colors duration-200"
              style={{
                border: '1px solid rgba(232,228,220,0.2)',
                color: 'var(--fg)',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.7)')
              }
              onMouseLeave={e =>
                (e.currentTarget.style.borderColor = 'rgba(232,228,220,0.2)')
              }
            >
              Our studio
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
