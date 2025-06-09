import type { Feature } from "@/lib/types"

interface FeatureCardProps {
  feature: Feature
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <IconComponent className="w-8 h-8 text-orange-400" />
      </div>
      <div className="text-4xl font-bold text-slate-600 mb-2">{feature.id.toString().padStart(2, "0")}</div>
      <h3 className="font-bold mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm">{feature.description}</p>
    </div>
  )
}
