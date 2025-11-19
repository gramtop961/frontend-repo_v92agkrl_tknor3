import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]">
            TEARS IN RAM
          </h1>
          <p className="mt-4 text-cyan-200/90 text-lg md:text-xl">
            Debug a dying AI's soul using only basic C programming.
          </p>
          <p className="mt-2 text-cyan-300/70 text-sm md:text-base">
            Save human memories from being lost forever, or help a digital consciousness become more human than human.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90" />
    </section>
  )
}
