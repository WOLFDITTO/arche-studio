import Reveal from './Reveal';

const quotes = [
  {
    body: '"Arche turned our product launch into something people actually talked about. The motion system they built became part of our brand DNA."',
    author: 'Clara Morin',
    role: 'Creative Director at Velo',
  },
  {
    body: '"Working with Arche felt like having a co-founder who speaks both design and code fluently. The result was beyond what we imagined."',
    author: 'Marcus Henriksen',
    role: 'CEO at Lufthaus',
  },
];

export default function Testimonials() {
  return (
    <section style={{ borderTop: '1px solid var(--border)', padding: '5.5rem 2.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Reveal>
          <h2
            className="font-normal tracking-[-0.02em]"
            style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', marginBottom: '3rem' }}
          >
            What clients say
          </h2>
        </Reveal>

        <div
          className="grid"
          style={{
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {quotes.map((q, i) => (
            <Reveal key={q.author} delay={i * 0.1}>
              <div style={{ background: 'var(--bg)', padding: '2.5rem' }}>
                <p
                  className="text-[16px] font-light leading-[1.65]"
                  style={{ marginBottom: '1.5rem' }}
                >
                  {q.body}
                </p>
                <p className="text-[12px] tracking-[0.04em]" style={{ color: 'var(--muted)' }}>
                  {q.author}, {q.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
