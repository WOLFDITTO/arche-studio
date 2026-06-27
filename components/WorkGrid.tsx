import Reveal from './Reveal';
import TiltCard from './TiltCard';
import Image from 'next/image';

const projects = [
  {
    name: 'Lufthaus',
    category: 'Brand identity',
    seed: 'arche-lufthaus',
    wide: true,
    w: 1400,
    h: 600,
  },
  {
    name: 'Sena',
    category: 'Digital campaign',
    seed: 'arche-sena',
    wide: false,
    w: 700,
    h: 525,
  },
  {
    name: 'Velo',
    category: 'Product launch',
    seed: 'arche-velo',
    wide: false,
    w: 700,
    h: 525,
  },
];

export default function WorkGrid() {
  return (
    <section id="work" style={{ padding: '5.5rem 0 0' }}>
      <div style={{ padding: '0 2.5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <Reveal>
          <h2
            className="font-normal tracking-[-0.02em]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
          >
            Selected work
          </h2>
        </Reveal>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--border)',
        }}
      >
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.08}
            className={p.wide ? 'col-span-2' : 'col-span-1'}
          >
            <TiltCard>
              <article className="work-cell overflow-hidden" style={{ background: 'var(--bg)' }}>
                <div className="overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${p.seed}/${p.w}/${p.h}`}
                    alt={`${p.name} — ${p.category}`}
                    width={p.w}
                    height={p.h}
                    className="work-img"
                    style={{ aspectRatio: p.wide ? '21/9' : '4/3' }}
                  />
                </div>
                <div
                  className="flex justify-between items-baseline"
                  style={{
                    padding: '1.1rem 1.5rem',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <span className="text-[14px] font-normal">{p.name}</span>
                  <span className="text-[12px]" style={{ color: 'var(--muted)' }}>
                    {p.category}
                  </span>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
