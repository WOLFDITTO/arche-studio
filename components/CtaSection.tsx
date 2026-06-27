import Reveal from './Reveal';
import MagneticButton from './MagneticButton';

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="text-center"
      style={{ borderTop: '1px solid var(--border)', padding: '7rem 2.5rem' }}
    >
      <Reveal>
        <h2
          className="font-light tracking-[-0.03em] leading-[1.06]"
          style={{ fontSize: 'clamp(36px, 6vw, 78px)', marginBottom: '2.5rem' }}
        >
          Ready to build
          <br />
          something{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>real?</em>
        </h2>
      </Reveal>

      <Reveal delay={0.12}>
        <MagneticButton>
          <a
            href="mailto:hello@arche.studio"
            className="inline-block text-[12px] font-medium uppercase tracking-[0.1em] rounded-[2px] transition-opacity duration-200 hover:opacity-80"
            style={{ background: 'var(--accent)', color: '#06060a', padding: '14px 36px' }}
          >
            Start a project
          </a>
        </MagneticButton>
      </Reveal>
    </section>
  );
}
