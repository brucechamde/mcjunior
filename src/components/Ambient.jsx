// Soft ambient light behind a section. Parent must be `relative isolate`.
// Radial gradients instead of blurred elements: same glow, a fraction of the paint cost.
function Ambient({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div
        className="orb-a absolute -left-64 -top-72 size-[52rem] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgb(232 87 127 / 0.16), transparent)' }}
      />
      <div
        className="orb-b absolute -right-72 top-1/4 size-[56rem] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgb(140 100 255 / 0.12), transparent)' }}
      />
    </div>
  )
}

export default Ambient
