export default function EnergyTower() {
  return (
    <div className="relative">
      <div className="relative w-full h-96">
        {/* Energy circles effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-80 border-2 border-orange-500/30 rounded-full animate-pulse"></div>
          <div
            className="absolute w-64 h-64 border-2 border-orange-500/50 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute w-48 h-48 border-2 border-orange-500/70 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        {/* Power tower */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-64 relative">
            {/* Tower structure */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-300"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-slate-300 rotate-45"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-slate-300 -rotate-45"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-300 rotate-45"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-300 -rotate-45"></div>
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-300 rotate-45"></div>
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-300 -rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
