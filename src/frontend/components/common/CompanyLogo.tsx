import { cn } from "@/lib/utils"

interface CompanyLogoProps {
  className?: string
}

export default function CompanyLogo({ className }: CompanyLogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>
      <div>
        <div className="font-bold text-sm">Название компании</div>
        <div className="text-xs text-slate-400">Энергетическое оборудование</div>
      </div>
    </div>
  )
}
