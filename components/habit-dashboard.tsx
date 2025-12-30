"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import HabitCard from "@/components/habit-card";

interface Habit {
  id: number;
  name: string;
  emoji: string;
  frequency: string;
  completed: boolean;
  progress: number;
}

export default function HabitDashboard({
  habits,
  onToggleHabit,
  onAddHabit,
  onViewProgress,
}: {
  habits: Habit[];
  onToggleHabit: (id: number) => void;
  onAddHabit: () => void;
  onViewProgress: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState<string | null>(null);

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrequency = frequencyFilter ? habit.frequency === frequencyFilter : true;
    return matchesSearch && matchesFrequency;
  });

  const toggleFrequencyFilter = (frequency: string) => {
    setFrequencyFilter(frequencyFilter === frequency ? null : frequency);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search habits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="p-3 hover:bg-secondary rounded-lg transition-colors group relative">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <div className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-10">
            <button
              onClick={() => toggleFrequencyFilter("Daily")}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                frequencyFilter === "Daily"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => toggleFrequencyFilter("Weekly")}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                frequencyFilter === "Weekly"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => toggleFrequencyFilter(null)}
              className={`w-full text-left px-4 py-2 text-sm border-t border-border transition-colors text-foreground hover:bg-secondary`}
            >
              Clear Filter
            </button>
          </div>
        </button>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">My Habits</h2>
        <div className="space-y-3">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onToggle={() => onToggleHabit(habit.id)} />
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No habits found matching your search.
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onAddHabit}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-14 h-14 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <Button
          onClick={onViewProgress}
          variant="outline"
          className="px-6 rounded-full bg-transparent"
        >
          View Progress
        </Button>
      </div>
    </div>
  );
}
