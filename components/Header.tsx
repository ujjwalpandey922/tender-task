"use client";

interface HeaderProps {
  completed: number;
  total: number;
}

export function Header({ completed, total }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-inherit backdrop-blur-sm sticky top-0 z-10 transition-all duration-300 mb-6">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Tender Tasks</h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your project tasks efficiently
            </p>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 animate-pulse">
                {completed}
              </div>
              <p className="text-slate-400 text-sm">of {total} completed</p>
            </div>

            {/* <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
              + New Task
            </button> */}
          </div>
        </div>

        {/* Progress bar with animation */}
        <div className="mt-4 bg-slate-800 rounded-full h-1.5 overflow-hidden shadow-inner">
          <div
            className="bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 h-full transition-all duration-500 shadow-lg shadow-blue-500/50"
            style={{
              width: `${total > 0 ? (completed / total) * 100 : 0}%`,
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </div>
      </div>
    </header>
  );
}
