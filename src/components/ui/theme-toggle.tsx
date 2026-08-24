"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark"

/**
 * Light and dark, with the choice remembered.
 *
 * The inline script in layout.tsx has already put the resolved theme class on
 * <html> before first paint, so this component only has to read it back — there
 * is no flash and no server/client mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Private mode or storage disabled: the theme still applies for this visit.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // Rendered before hydration too, so the layout never shifts.
      aria-label={
        theme === null
          ? "Switch colour theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      }
      className={`grid h-9 w-9 place-items-center text-ink-3 transition-colors hover:text-ink ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
          </>
        ) : (
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
        )}
      </svg>
    </button>
  )
}
