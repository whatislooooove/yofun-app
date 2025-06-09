export default function SolarPanelShowcase() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg p-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-32 h-48 bg-slate-800 rounded-lg mx-auto mb-4 relative">
            <div className="absolute inset-4 grid grid-cols-4 gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-blue-400 rounded-sm"></div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">SK-320</div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
      </div>
    </div>
  )
}
