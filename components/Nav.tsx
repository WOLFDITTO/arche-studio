'use client';
import { useLenis } from 'lenis/react';
import MagneticButton from './MagneticButton';

const links = [
  { label: 'Work',     href: '#work' },
  { label: 'Studio',   href: '#studio' },
  { label: 'Services', href: '#services' },
];

export default function Nav() {
  const lenis = useLenis();

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -64, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView();
    }
  };

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
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={scrollTo(href)}
            className="text-[13px] tracking-[0.03em] transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        onClick={scrollTo('#contact')}
        className="text-[12px] uppercase tracking-[0.07em] px-[18px] py-2 rounded-[2px] transition-all duration-200"
        style={{ border: '1px solid rgba(232,228,220,0.18)', color: 'var(--fg)' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; }}
      >
        Start a project
      </a>
    </header>
  );
}
