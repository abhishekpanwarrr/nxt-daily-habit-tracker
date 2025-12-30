"use client"
import { Moon, Sun, LogOut } from "lucide-react"

interface SettingsMenuProps {
  onClose: () => void
  theme: string
  onThemeChange: (theme: string) => void
  onLogout: () => void
}

export default function SettingsMenu({ onClose, theme, onThemeChange, onLogout }: SettingsMenuProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="absolute top-16 right-0 bg-card border border-border rounded-xl shadow-xl p-2 z-50 min-w-[220px]">
        <div className="space-y-1">
          {/* Theme Toggle */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground mb-3">Theme</p>
            <div className="flex gap-2">
              <button
                onClick={() => onThemeChange("light")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 transition-colors ${
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm">Light</span>
              </button>
              <button
                onClick={() => onThemeChange("dark")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg flex-1 transition-colors ${
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm">Dark</span>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
