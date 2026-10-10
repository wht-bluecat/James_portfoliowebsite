"use client"

import { useState, useEffect } from "react"

export function LiveClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now)
      setTime(formatted)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
      {time} · PH
    </span>
  )
}
