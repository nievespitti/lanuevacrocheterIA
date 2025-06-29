"use client";

import { useState, useEffect, useCallback } from "react";

const PROGRESS_KEY = "la_crocheteria_progress";

export function useProgress(itemId: string) {
  const [isCompleted, setIsCompleted] = useState(false);

  // Effect to load initial state from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        if (progress[itemId]) {
          setIsCompleted(true);
        }
      }
    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
      // Initialize with empty object if parsing fails
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({}));
    }
  }, [itemId]);

  const toggleComplete = useCallback(() => {
    try {
      const newValue = !isCompleted;
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      progress[itemId] = newValue;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      setIsCompleted(newValue);
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  }, [itemId, isCompleted]);

  return { isCompleted, toggleComplete };
}
