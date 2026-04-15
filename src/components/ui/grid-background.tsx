"use client"

export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Fixed vertical dashed grid lines */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        {[0, 20, 40, 60, 80, 100].map((pct) => (
          <div
            key={pct}
            className="absolute top-0 bottom-0"
            style={{
              left: `${pct}%`,
              width: "1px",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #d4d4cc 0px, #d4d4cc 4px, transparent 4px, transparent 12px)",
            }}
          />
        ))}
      </div>
      {/* Scrolling horizontal dashed lines — via CSS on the wrapper */}
      <div
        className="relative z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 279px, #d4d4cc 279px, #d4d4cc 280px)",
          backgroundSize: "8px 280px",
        }}
      >
        {children}
      </div>
    </div>
  )
}
