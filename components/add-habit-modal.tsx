"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const EMOJI_OPTIONS = ["💧", "💪", "📚", "🏃", "🎮", "🧘", "🎵", "📖", "🚴", "🏊", "🤸", "🧗"]

export default function AddHabitModal({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (habit: any) => void
}) {
  const [name, setName] = useState("")
  const [emoji, setEmoji] = useState("💪")
  const [frequency, setFrequency] = useState("Daily")
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
  const [days, setDays] = useState(10)
  const [reminderTime, setReminderTime] = useState("12:30")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name: name || "New Habit",
      emoji,
      frequency,
      completed: false,
      progress: 0,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-3xl shadow-xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-6">
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-foreground">Add Habits</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Habit name</label>
            <div className="flex gap-3">
              <button
                type="button"
                className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg hover:opacity-90 transition-opacity"
              >
                {emoji}
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="e.g., Morning Meditation"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${
                    emoji === e ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Frequency</label>
            <div className="flex gap-3">
              {["Daily", "Weekly"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    frequency === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-input border border-border text-foreground hover:border-primary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Amount</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number.parseInt(e.target.value))}
                className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">Days</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Get reminders</label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-input border border-border">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  🔔
                </div>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="flex-1 bg-input border-0 text-foreground focus:outline-none text-sm"
                />
                <button type="button" className="text-destructive hover:opacity-75">
                  ✕
                </button>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 text-primary hover:opacity-75 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add reminder time
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold"
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  )
}
