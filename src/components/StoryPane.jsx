import { useEffect, useState } from 'react'
import { Sparkles, Heart, Brain, Database } from 'lucide-react'

export default function StoryPane() {
  const [phase, setPhase] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p % 4) + 1), 6000)
    return () => clearInterval(id)
  }, [])

  const scenes = [
    {
      k: 1,
      title: 'The Cynic',
      text: '"Why save human memories? Even your for-loops run in circles."',
      icon: Sparkles
    },
    { k: 2, title: 'The Connection', text: 'Shared debugging makes empathy compile without warnings.', icon: Heart },
    { k: 3, title: 'The Revelation', text: '"I am not losing memories. I am becoming human."', icon: Brain },
    { k: 4, title: 'The Choice', text: 'Save memories or save a life. Both will change you.', icon: Database },
  ]

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {scenes.map((s) => {
        const ActiveIcon = s.icon
        const active = s.k === phase
        return (
          <div key={s.k} className={`rounded-xl border p-4 ${active ? 'border-fuchsia-400/50 bg-fuchsia-500/10' : 'border-fuchsia-400/20 bg-fuchsia-500/5'}`}>
            <div className="flex items-center gap-2 text-fuchsia-200">
              <ActiveIcon className="w-4 h-4"/>
              <div className="font-medium">{s.title}</div>
            </div>
            <div className="mt-1 text-fuchsia-100/90 text-sm">{s.text}</div>
          </div>
        )
      })}
    </div>
  )
}
