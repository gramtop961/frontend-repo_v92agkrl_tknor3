import { useEffect, useMemo, useRef, useState } from 'react'
import { Play, RefreshCw, Bug, TerminalSquare } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function CrtFrame({ children }) {
  return (
    <div className="relative rounded-xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.25)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_1px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_3px)]"/>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5"/>
      {children}
    </div>
  )
}

function PhaseTabs({ phases, current, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {phases.map(p => (
        <button key={p.id} onClick={() => onSelect(p.id)}
          className={`px-3 py-1.5 rounded-md text-sm border ${current===p.id? 'bg-cyan-500/20 border-cyan-400 text-cyan-200' : 'border-cyan-500/20 text-cyan-300/70 hover:text-cyan-200'}`}
        >{p.title}</button>
      ))}
    </div>
  )
}

export default function Terminal() {
  const [phases, setPhases] = useState([])
  const [phaseId, setPhaseId] = useState('')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [errors, setErrors] = useState('')
  const [roy, setRoy] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/phases`).then(r=>r.json()).then(data => {
      setPhases(data)
      if (data?.length) {
        setPhaseId(data[0].id)
        setCode(data[0].starterCode)
      }
    })
  }, [])

  const current = useMemo(() => phases.find(p=>p.id===phaseId) || null, [phases, phaseId])

  function selectPhase(id) {
    const p = phases.find(x=>x.id===id)
    if (!p) return
    setPhaseId(id)
    setCode(p.starterCode)
    setOutput('')
    setErrors('')
    setMessages([])
    setRoy('')
  }

  async function compileRun() {
    setLoading(true)
    setOutput('')
    setErrors('')
    setMessages([])
    setRoy('')
    try {
      const res = await fetch(`${API}/api/compile`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
      const data = await res.json()
      setOutput(data.run_stdout || '')
      setErrors((data.compile_stderr || '') + (data.run_stderr || ''))

      const vres = await fetch(`${API}/api/validate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phase_id: phaseId, code, compile_stderr: data.compile_stderr, run_stdout: data.run_stdout }) })
      const v = await vres.json()
      setMessages(v.messages || [])
      setRoy(v.roy || '')
    } catch (e) {
      setErrors(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div>
        <PhaseTabs phases={phases} current={phaseId} onSelect={selectPhase} />
        <CrtFrame>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-cyan-500/20 text-cyan-300/80">
            <TerminalSquare className="w-4 h-4" />
            ROY-BATTY-OS Interactive Terminal
            <div className="ml-auto flex gap-2">
              <button onClick={compileRun} disabled={loading} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30 border border-cyan-400/40">
                <Play className="w-4 h-4"/> Run
              </button>
            </div>
          </div>
          <textarea value={code} onChange={e=>setCode(e.target.value)} spellCheck={false}
            className="w-full h-[340px] bg-transparent text-cyan-100 p-3 font-mono text-sm outline-none resize-none"/>
        </CrtFrame>
        {messages?.length>0 && (
          <div className="mt-3 text-cyan-200/90">
            {messages.map((m,i)=>(<div key={i} className="text-sm">• {m}</div>))}
          </div>
        )}
      </div>
      <div className="space-y-4">
        <CrtFrame>
          <div className="px-3 py-2 border-b border-cyan-500/20 text-cyan-300/80">Program Output</div>
          <pre className="p-3 text-cyan-100/95 whitespace-pre-wrap min-h-[120px]">{output || '—'}</pre>
        </CrtFrame>
        <CrtFrame>
          <div className="px-3 py-2 border-b border-cyan-500/20 text-cyan-300/80">Diagnostics</div>
          <pre className="p-3 text-pink-300/90 whitespace-pre-wrap min-h-[120px]">{errors || '—'}</pre>
        </CrtFrame>
        <CrtFrame>
          <div className="px-3 py-2 border-b border-cyan-500/20 text-cyan-300/80">ROY-BATTY-OS</div>
          <div className="p-3 text-cyan-100/90">
            {roy || '"All those moments will be lost in time... like uninitialized pointers in the heap."'}
          </div>
        </CrtFrame>
      </div>
    </div>
  )
}
