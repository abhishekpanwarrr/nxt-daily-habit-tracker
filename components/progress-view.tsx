"use client"

import { ChevronLeft, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Habit {
  id: number
  name: string
  emoji: string
  frequency: string
  completed: boolean
  progress: number
}

export default function ProgressView({
  habits,
  onBack,
}: {
  habits: Habit[]
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<"onprogress" | "completed">("onprogress")
  const [selectedMonth, setSelectedMonth] = useState("May 2025")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const filteredHabits =
    activeTab === "completed" ? habits.filter((h) => h.completed) : habits.filter((h) => !h.completed)

  const completedCount = habits.filter((h) => h.completed).length
  const totalHabits = habits.length
  const completionPercentage = Math.round((completedCount / totalHabits) * 100)

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const currentDate = new Date()
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-primary hover:opacity-75 font-medium">
        <ChevronLeft className="w-5 h-5" /> Back
      </button>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Progress</h2>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <option>January 2025</option>
            <option>February 2025</option>
            <option>March 2025</option>
            <option>April 2025</option>
            <option>May 2025</option>
            <option>June 2025</option>
            <option>July 2025</option>
            <option>August 2025</option>
            <option>September 2025</option>
            <option>October 2025</option>
            <option>November 2025</option>
            <option>December 2025</option>
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-8">
          {daysOfWeek.map((day, index) => {
            const date = new Date(startOfWeek)
            date.setDate(date.getDate() + index)
            const dayNum = date.getDate()
            const isToday = dayNum === currentDate.getDate()
            const isSelected = dayNum === selectedDate

            return (
              <div key={day} className="text-center">
                <p className="text-xs font-medium text-muted-foreground mb-2">{day}</p>
                <button
                  onClick={() => setSelectedDate(dayNum)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isToday
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground border border-border hover:border-primary"
                  }`}
                >
                  {dayNum}
                </button>
              </div>
            )
          })}
        </div>

        <div className="bg-accent/30 rounded-2xl p-6 border border-accent mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(completionPercentage / 100) * 283} 283`}
                  className="text-accent-foreground transition-all"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent-foreground">{completionPercentage}%</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {selectedDate ? `Your habits on ${selectedDate} ${selectedMonth}` : "Your today habits is almost Done!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalHabits} Completed
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("onprogress")}
            className={`flex-1 ${
              activeTab === "onprogress"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-transparent border border-border text-foreground hover:border-primary"
            }`}
          >
            Onprogress
          </Button>
          <Button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 ${
              activeTab === "completed"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-transparent border border-border text-foreground hover:border-primary"
            }`}
          >
            Completed
          </Button>
        </div>

        <div className="space-y-3">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-all"
              >
                <span className="text-2xl">{habit.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{habit.name}</h3>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${habit.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{habit.progress}%</span>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No {activeTab === "completed" ? "completed" : "in-progress"} habits yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
