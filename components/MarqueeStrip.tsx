const words = [
  'Motion Design',
  'WebGL',
  '3D Worlds',
  'Brand Identity',
  'Interactive',
  'Type Systems',
  'Art Direction',
  'Digital Campaigns',
];

function Chunk() {
  return (
    <div className="flex items-center gap-8 px-8 shrink-0">
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className="text-[11px] uppercase tracking-[0.2em] whitespace-nowrap"
            style={{ color: 'var(--muted)' }}
          >
            {w}
          </span>
          {i < words.length - 1 && (
            <span
              className="w-[3px] h-[3px] rounded-full shrink-0"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden py-[13px]"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="flex w-max"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        <Chunk />
        <Chunk />
        <Chunk />
        <Chunk />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
