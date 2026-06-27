import Reveal from './Reveal';

const services = [
  'Motion design',
  'WebGL and 3D',
  'Brand identity',
  'Interactive installations',
  'Digital campaigns',
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ borderTop: '1px solid var(--border)', padding: '5.5rem 2.5rem' }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <Reveal className="flex flex-col gap-6">
          <h2
            className="font-normal tracking-[-0.02em] leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)' }}
          >
            What we do,
            <br />
            and why it matters.
          </h2>
          <p
            className="text-[14px] font-light leading-[1.72]"
            style={{ color: 'var(--muted)', maxWidth: '340px' }}
          >
            We work at the intersection of motion, code, and spatial design.
            Every project is built from intent, not templates.
          </p>
        </Reveal>

        <div className="pt-1">
          {services.map((name, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <div
                className="flex justify-between items-center"
                style={{
                  padding: '1.1rem 0',
                  borderBottom: '1px solid var(--border)',
                  ...(i === 0 ? { borderTop: '1px solid var(--border)' } : {}),
                }}
              >
                <span className="text-[15px] font-normal">{name}</span>
                <span className="text-[20px] leading-none" style={{ color: 'var(--accent)' }}>
                  +
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
