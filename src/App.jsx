import Hero from './components/Hero'
import Terminal from './components/Terminal'
import StoryPane from './components/StoryPane'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero />

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <section className="mb-10">
          <div className="mb-4 text-cyan-200/90">
            <div className="text-sm uppercase tracking-widest text-cyan-400/70">ROY-BATTY-OS // Interactive Debugger</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold">Reality. Memory. Consciousness. Choice.</h2>
            <p className="mt-2 text-cyan-300/80">Fix corrupted C code to stabilize a fading mind. Errors produce glitches; correct solutions calm the storm.</p>
          </div>
          <Terminal />
        </section>

        <section>
          <div className="mb-3 text-fuchsia-200/90">
            <div className="text-sm uppercase tracking-widest text-fuchsia-400/70">Emotional Trajectory</div>
            <h3 className="mt-1 text-xl md:text-2xl font-semibold">All those moments...</h3>
          </div>
          <StoryPane />
        </section>
      </main>

      <footer className="px-6 py-8 text-center text-cyan-300/60">
        "I've seen code you people wouldn't believe..." — ROY-BATTY-OS
      </footer>
    </div>
  )
}

export default App
