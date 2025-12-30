"use client"

import { useState } from "react"
import Header from "@/components/header"
import HabitDashboard from "@/components/habit-dashboard"
import AddHabitModal from "@/components/add-habit-modal"
import ProgressView from "@/components/progress-view"

export default function Home() {
  const [currentView, setCurrentView] = useState<"dashboard" | "progress">("dashboard")
  const [showAddHabit, setShowAddHabit] = useState(false)
  const [theme, setTheme] = useState("light")
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink Water",
      emoji: "💧",
      frequency: "Daily",
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      name: "Exercise",
      emoji: "💪",
      frequency: "Daily",
      completed: false,
      progress: 30,
    },
    {
      id: 3,
      name: "Read book",
      emoji: "📚",
      frequency: "Daily",
      completed: false,
      progress: 50,
    },
    {
      id: 4,
      name: "Running",
      emoji: "🏃",
      frequency: "Daily",
      completed: false,
      progress: 90,
    },
    {
      id: 5,
      name: "Gaming",
      emoji: "🎮",
      frequency: "Weekly",
      completed: false,
      progress: 0,
    },
  ])

  const addHabit = (habit: any) => {
    setHabits([...habits, { ...habit, id: habits.length + 1 }])
    setShowAddHabit(false)
  }

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed, progress: !habit.completed ? 100 : 0 } : habit,
      ),
    )
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleLogout = () => {
    console.log("User logged out")
    // Add your logout logic here
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Header theme={theme} onThemeChange={handleThemeChange} onLogout={handleLogout} />

        <div className="mt-8">
          {currentView === "dashboard" ? (
            <HabitDashboard
              habits={habits}
              onToggleHabit={toggleHabit}
              onAddHabit={() => setShowAddHabit(true)}
              onViewProgress={() => setCurrentView("progress")}
            />
          ) : (
            <ProgressView habits={habits} onBack={() => setCurrentView("dashboard")} />
          )}
        </div>

        {showAddHabit && <AddHabitModal onClose={() => setShowAddHabit(false)} onAdd={addHabit} />}
      </div>
    </main>
  )
}
