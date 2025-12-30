"use client"

import { useState } from "react"
import { Bell, Settings } from "lucide-react"
import SettingsMenu from "@/components/settings-menu"

interface HeaderProps {
  theme: string
  onThemeChange: (theme: string) => void
  onLogout: () => void
}

export default function Header({ theme, onThemeChange, onLogout }: HeaderProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
          ✓
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hello, Wafaa</h1>
          <p className="text-sm text-muted-foreground">Let's build great habits together!</p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </button>
        {showSettings && (
          <SettingsMenu
            onClose={() => setShowSettings(false)}
            theme={theme}
            onThemeChange={onThemeChange}
            onLogout={onLogout}
          />
        )}
      </div>
    </header>
  )
}
