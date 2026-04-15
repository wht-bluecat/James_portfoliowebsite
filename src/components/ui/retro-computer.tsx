"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function RetroComputer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-4, 4]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "900px" }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative select-none"
      >
        {/* ═══ MONITOR ASSEMBLY ═══ */}
        <div className="relative">
          {/* ── Right side panel (behind front) ── */}
          <div
            className="absolute top-[6px] -right-[34px] w-[40px] rounded-r-[4px]"
            style={{
              height: "248px",
              background: "linear-gradient(90deg, #cec7b9, #c4bdb0)",
              transform: "skewY(-6deg)",
              zIndex: 1,
            }}
          >
            {/* Side vents */}
            <div className="absolute inset-y-[30px] left-[8px] right-[8px] flex flex-col gap-[5px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-full h-[1.5px] rounded-full bg-[#b8b1a3]" />
              ))}
            </div>
          </div>

          {/* ── Top panel (behind front) ── */}
          <div
            className="absolute -top-[28px] left-[4px] h-[34px] rounded-t-[4px]"
            style={{
              width: "292px",
              background: "linear-gradient(180deg, #e8e1d3, #ddd6c8)",
              transform: "skewX(-6deg)",
              transformOrigin: "bottom left",
              zIndex: 1,
            }}
          >
            {/* Top vents */}
            <div className="absolute inset-x-[40px] top-[8px] flex flex-col gap-[3px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full h-[1.5px] rounded-full bg-[#d0c9bb]" />
              ))}
            </div>
          </div>

          {/* ── Front face (on top of everything) ── */}
          <div
            className="relative w-[280px] md:w-[300px] h-[240px] md:h-[260px] rounded-[8px]"
            style={{
              background: "linear-gradient(180deg, #ede6d8 0%, #e2dbd0 40%, #d8d1c5 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 3px rgba(0,0,0,0.04), 4px 6px 20px rgba(0,0,0,0.12)",
              zIndex: 2,
            }}
          >
            {/* Screen — takes up most of the front */}
            <div
              className="absolute top-[14px] left-[14px] right-[14px] bottom-[36px] rounded-[6px] overflow-hidden"
              style={{
                background: "#111",
                boxShadow: "inset 0 3px 15px rgba(0,0,0,0.8), 0 0 0 3px #c8c1b3",
              }}
            >
              {/* CRT glare overlay */}
              <div
                className="absolute inset-0 z-20 pointer-events-none rounded-[6px]"
                style={{
                  background: "radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.07) 0%, transparent 55%)",
                }}
              />
              <DaVinciScreen />
            </div>

            {/* Bottom strip — power LED + label */}
            <div className="absolute bottom-[8px] left-[14px] right-[14px] flex items-center justify-between">
              {/* Power LED */}
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-[6px] h-[6px] rounded-full"
                  style={{ background: "#1a7a4f", boxShadow: "0 0 6px #1a7a4f55" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono uppercase tracking-widest text-[#b0a99b]" style={{ fontSize: "5px" }}>
                  JY-STUDIO
                </span>
              </div>

              {/* Floppy slot */}
              <div
                className="w-[60px] h-[8px] rounded-[2px]"
                style={{
                  background: "linear-gradient(180deg, #c8c1b3, #bdb6a8)",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.15)",
                }}
              />
            </div>

            {/* ── Stickers on front face ── */}
            {/* Name sticker */}
            <div
              className="absolute bottom-[28px] left-[18px] px-[6px] py-[3px] rounded-[3px] text-white font-mono uppercase tracking-wider"
              style={{
                fontSize: "5px",
                background: "linear-gradient(135deg, #c0392b 0%, #96281b 100%)",
                transform: "rotate(-3deg)",
                boxShadow: "1px 1px 3px rgba(0,0,0,0.25)",
                lineHeight: 1.4,
                zIndex: 3,
              }}
            >
              <span className="font-bold" style={{ fontSize: "6px" }}>JAMES</span>
              <br />
              YAPTANGCO
            </div>

            {/* Straw Hat sticker */}
            <div
              className="absolute bottom-[26px] left-[70px]"
              style={{ transform: "rotate(5deg)", zIndex: 3 }}
            >
              <StrawHatSticker />
            </div>
          </div>
        </div>

        {/* ═══ STAND ═══ */}
        <div className="relative mx-auto" style={{ zIndex: 2 }}>
          {/* Neck */}
          <div
            className="mx-auto w-[50px] h-[18px]"
            style={{
              background: "linear-gradient(180deg, #d0c9bb, #c4bdb0)",
              boxShadow: "2px 0 0 #c4bdb0, -2px 0 0 #d8d1c3",
            }}
          />
          {/* Base */}
          <div
            className="mx-auto w-[160px] md:w-[180px] h-[10px] rounded-[4px]"
            style={{
              background: "linear-gradient(180deg, #ddd6c8, #d0c9bb)",
              boxShadow: "0 3px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          />
          {/* Base front lip */}
          <div
            className="mx-auto w-[160px] md:w-[180px] h-[5px] rounded-b-[4px]"
            style={{
              background: "linear-gradient(180deg, #c8c1b3, #bdb6a8)",
            }}
          />
        </div>

        {/* ═══ KEYBOARD ═══ */}
        <div className="mt-3" style={{ zIndex: 2 }}>
          <Keyboard />
        </div>

        {/* Floor shadow */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[115%] h-[20px] rounded-[50%]"
          style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.09) 0%, transparent 70%)" }}
        />
      </motion.div>
    </div>
  )
}

/* ─── One Piece Straw Hat sticker (SVG) ─── */
function StrawHatSticker() {
  return (
    <svg width="32" height="24" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* White sticker border */}
      <ellipse cx="32" cy="26" rx="31" ry="21" fill="white" opacity="0.9" />
      {/* Hat brim */}
      <ellipse cx="32" cy="34" rx="26" ry="8" fill="#c8b44c" />
      <ellipse cx="32" cy="34" rx="26" ry="8" fill="url(#brimShade)" />
      {/* Brim edge lines */}
      <path d="M8 34 Q12 30, 18 33" stroke="#8a7a30" strokeWidth="0.8" fill="none" />
      <path d="M46 33 Q52 30, 56 34" stroke="#8a7a30" strokeWidth="0.8" fill="none" />
      <path d="M22 36 Q26 38, 30 36" stroke="#8a7a30" strokeWidth="0.6" fill="none" />
      <path d="M36 36 Q40 38, 44 36" stroke="#8a7a30" strokeWidth="0.6" fill="none" />
      {/* Hat crown */}
      <path d="M18 34 Q18 14, 32 12 Q46 14, 46 34" fill="#d4c458" />
      <path d="M18 34 Q18 14, 32 12 Q46 14, 46 34" fill="url(#crownShade)" />
      {/* Crown stitch marks */}
      <path d="M24 18 L26 22" stroke="#8a7a30" strokeWidth="0.8" />
      <path d="M30 15 L31 19" stroke="#8a7a30" strokeWidth="0.8" />
      <path d="M37 15 L36 19" stroke="#8a7a30" strokeWidth="0.8" />
      <path d="M42 18 L40 22" stroke="#8a7a30" strokeWidth="0.8" />
      <path d="M22 26 L24 28" stroke="#8a7a30" strokeWidth="0.6" />
      <path d="M40 26 L42 28" stroke="#8a7a30" strokeWidth="0.6" />
      {/* Red band */}
      <path d="M18 28 Q18 26, 20 26 L44 26 Q46 26, 46 28 L46 31 Q46 33, 44 33 L20 33 Q18 33, 18 31 Z" fill="#a83232" />
      <path d="M18 28 Q18 26, 20 26 L44 26 Q46 26, 46 28 L46 31 Q46 33, 44 33 L20 33 Q18 33, 18 31 Z" fill="url(#bandShade)" />
      {/* Gradients */}
      <defs>
        <linearGradient id="brimShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8a040" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a08830" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="crownShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8a7a30" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="bandShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#600" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─── DaVinci Resolve screen ─── */
function DaVinciScreen() {
  return (
    <div className="w-full h-full flex flex-col text-[8px] font-mono bg-[#1e1e1e]">
      {/* Menu bar */}
      <div className="flex items-center gap-2 px-2 py-[3px] bg-[#2d2d2d] border-b border-[#3a3a3a]">
        <div className="flex gap-[3px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[#ff5f57]" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#febc2e]" />
          <span className="w-[5px] h-[5px] rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[#888] text-[5px] ml-1">DaVinci Resolve</span>
      </div>

      {/* Main area */}
      <div className="flex-1 flex min-h-0">
        {/* Media pool */}
        <div className="w-[25%] border-r border-[#3a3a3a] p-1 flex flex-col gap-[3px]">
          <span className="text-[#555] text-[4px] uppercase tracking-wider">Media Pool</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-[10px] rounded-[2px]" style={{ background: i % 2 === 0 ? "#2e2e2e" : "#282828" }} />
          ))}
        </div>

        {/* Preview monitor */}
        <div className="flex-1 flex items-center justify-center bg-[#0d0d0d] relative overflow-hidden">
          <PreviewAnimation />
        </div>
      </div>

      {/* Timeline */}
      <div className="h-[42%] border-t border-[#3a3a3a] bg-[#1a1a1a] relative overflow-hidden">
        <div className="flex items-center justify-between px-1 py-[2px] border-b border-[#2a2a2a]">
          <span className="text-[#555] text-[4px] uppercase tracking-wider">Timeline 1</span>
          <TimecodeCounter />
        </div>

        <div className="px-1 py-[2px] flex flex-col gap-[2px] relative">
          <AnimatedPlayhead />
          <Track label="V1" color="#1a7a4f" widths={["30%", "15%", "25%"]} />
          <Track label="V2" color="#4a6fa5" widths={["10%", "40%", "20%"]} />
          <Track label="V3" color="#7a4fa5" widths={["20%", "30%", "15%"]} />
          <AudioTrack label="A1" color="#1a7a4f" />
          <AudioTrack label="A2" color="#b5832a" delay={0.8} />
        </div>
      </div>
    </div>
  )
}

function TimecodeCounter() {
  const [frame, setFrame] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f + 1) % 30), 33)
    return () => clearInterval(interval)
  }, [])
  const sec = Math.floor(frame / 30) % 60
  return (
    <span className="text-[#1a7a4f] text-[4px] font-mono tabular-nums">
      00:01:{String(24 + sec).padStart(2, "0")}:{String(frame).padStart(2, "0")}
    </span>
  )
}

function Track({ label, color, widths }: { label: string; color: string; widths: string[] }) {
  return (
    <div className="flex gap-[2px] items-center">
      <span className="text-[#555] text-[4px] w-[10px] shrink-0">{label}</span>
      <div className="flex-1 flex gap-[1px] h-[7px]">
        {widths.map((w, i) => (
          <motion.div
            key={i}
            className="rounded-[1px] h-full"
            style={{
              background: i === 0 ? `linear-gradient(90deg, ${color}, ${color}cc)` : `${color}${i === 1 ? "55" : "77"}`,
              width: w,
            }}
            animate={{ width: [w, `${parseInt(w) + 10}%`, w] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>
    </div>
  )
}

function PreviewAnimation() {
  return (
    <div className="w-full h-full relative">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #1a1a2e, #16213e)",
            "linear-gradient(135deg, #0f3460, #1a1a2e)",
            "linear-gradient(135deg, #1a1a2e, #16213e)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full border border-[#1a7a4f]/30"
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#1a7a4f]"
        animate={{ scale: [1, 0.5, 1], opacity: [0.9, 0.3, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute top-[4px] right-[4px] flex items-center gap-[2px]">
        <motion.div
          className="w-[3px] h-[3px] rounded-full bg-red-500"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-red-500/80 text-[4px] font-mono">REC</span>
      </div>
    </div>
  )
}

function AnimatedPlayhead() {
  return (
    <motion.div
      className="absolute top-0 bottom-0 w-[1px] bg-red-500 z-10"
      animate={{ left: ["10px", "95%", "10px"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="w-[5px] h-[5px] bg-red-500 -translate-x-[2px] -translate-y-[1px]"
        style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
      />
    </motion.div>
  )
}

function AudioTrack({ label, color, delay = 0 }: { label: string; color: string; delay?: number }) {
  return (
    <div className="flex gap-[2px] items-center">
      <span className="text-[#555] text-[4px] w-[10px] shrink-0">{label}</span>
      <div className="flex-1 h-[5px] flex items-center gap-[0.5px] rounded-[1px]" style={{ background: `${color}10` }}>
        {Array.from({ length: 35 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-[0.5px]"
            style={{ background: `${color}70`, minWidth: "1px" }}
            animate={{ height: ["20%", `${25 + Math.sin(i * 0.6) * 65}%`, "20%"] }}
            transition={{
              duration: 1.2 + Math.random() * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + i * 0.04,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Keyboard ─── */
function Keyboard() {
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = new Set<number>()
      const count = 1 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count; i++) {
        newActive.add(Math.floor(Math.random() * 50))
      }
      setActiveKeys(newActive)
    }, 130)
    return () => clearInterval(interval)
  }, [])

  const rows = [
    { widths: Array(13).fill(14) },
    { widths: [18, ...Array(11).fill(14)] },
    { widths: [22, ...Array(10).fill(14)] },
    { widths: [16, 14, 14, 60, 14, 14, 14, 16, 16] },
  ]

  let keyIndex = 0

  return (
    <div
      className="mx-auto w-[240px] md:w-[260px] py-[6px] px-[8px] rounded-[5px]"
      style={{
        background: "linear-gradient(180deg, #ede6d8 0%, #ddd6c8 50%, #d0c9bb 100%)",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
        transform: "perspective(600px) rotateX(16deg)",
      }}
    >
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-[2px] justify-center mb-[2px]">
          {row.widths.map((w, colIdx) => {
            const idx = keyIndex++
            const isActive = activeKeys.has(idx)
            return (
              <div
                key={colIdx}
                className="rounded-[2px] transition-all duration-75"
                style={{
                  width: `${w}px`,
                  height: "9px",
                  background: isActive
                    ? "linear-gradient(180deg, #c0b8aa, #b0a89a)"
                    : "linear-gradient(180deg, #e0d9cb, #d0c9bb)",
                  boxShadow: isActive
                    ? "inset 0 1px 3px rgba(0,0,0,0.25)"
                    : "0 1.5px 0 #b8b1a3, 0 2px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)",
                  transform: isActive ? "translateY(1.5px)" : "translateY(0)",
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
