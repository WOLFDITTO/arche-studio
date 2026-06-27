'use client';
import MagneticButton from './MagneticButton';

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-10 h-16"
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'rgba(6,6,10,0.88)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <span className="text-[17px] font-medium tracking-[0.1em]">ARCHE</span>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#work" className="text-[13px] tracking-[0.03em] transition-colors duration-200" style={{ color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
          Work
        </a>
        <a href="#studio" className="text-[13px] tracking-[0.03em] transition-colors duration-200" style={{ color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
          Studio
        </a>
        <a href="#services" className="text-[13px] tracking-[0.03em] transition-colors duration-200" style={{ color: 'var(--muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
          Services
        </a>
      </nav>

      <MagneticButton>
        <a
          href="#contact"
          className="text-[12px] uppercase tracking-[0.07em] px-[18px] py-2 rounded-[2px] transition-all duration-200"
          style={{ border: '1px solid rgba(232,228,220,0.18)', color: 'var(--fg)', display: 'block' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; }}
        >
          Start a project
        </a>
      </MagneticButton>
    </header>
  );
}
