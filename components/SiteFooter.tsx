'use client';

export default function SiteFooter() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-4 px-10 py-7"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <span className="text-[14px] font-medium tracking-[0.1em]">ARCHE</span>

      <span className="text-[12px]" style={{ color: 'var(--muted)' }}>
        &copy; 2026 Arche Studio
      </span>

      <nav className="flex gap-6">
        {['Instagram', 'LinkedIn', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="text-[12px] transition-colors duration-200"
            style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {link}
          </a>
        ))}
      </nav>
    </footer>
  );
}
