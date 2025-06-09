import type { Stat } from "@/lib/types"

interface StatsDisplayProps {
  stats: Stat[]
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="flex items-center space-x-12 mt-12">
      {stats.map((stat) => (
        <div key={stat.id} className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-orange-400 font-bold">{stat.value}</span>
          </div>
          <div>
            <div className="font-bold">{stat.label}</div>
            {stat.sublabel && <div className="text-sm text-slate-400">{stat.sublabel}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
