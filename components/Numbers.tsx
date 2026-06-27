import Reveal from './Reveal';

const stats = [
  { value: '83', label: 'Projects delivered' },
  { value: '11+', label: 'Years in motion' },
  { value: '29', label: 'Countries reached' },
];

export default function Numbers() {
  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--border)',
        }}
      >
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div style={{ background: 'var(--bg)', padding: '3.5rem 2.5rem' }}>
              <div
                className="font-light leading-none tracking-[-0.04em]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', color: 'var(--accent)', marginBottom: '0.5rem' }}
              >
                {s.value}
              </div>
              <div className="text-[12px] tracking-[0.05em]" style={{ color: 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
