"use client"

import { Check } from "lucide-react"

interface Habit {
  id: number
  name: string
  emoji: string
  frequency: string
  completed: boolean
  progress: number
}

export default function HabitCard({
  habit,
  onToggle,
}: {
  habit: Habit
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-md bg-background">
      <div className="text-2xl">{habit.emoji}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{habit.name}</h3>
        <p className="text-sm text-muted-foreground">{habit.frequency}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          habit.completed ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary"
        }`}
      >
        {habit.completed && <Check className="w-4 h-4" />}
      </button>
    </div>
  )
}
