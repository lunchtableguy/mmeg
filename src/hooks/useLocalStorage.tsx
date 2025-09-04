import { useState, useEffect } from 'react'
import { useCookieAllowed } from '@/contexts/CookieConsent'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const preferencesAllowed = useCookieAllowed('preferences')
  
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    // If preferences cookies are not allowed, return initial value
    if (!preferencesAllowed) {
      return initialValue
    }
    
    try {
      // Get from local storage by key
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue
      }
      return initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save state
      setStoredValue(valueToStore)
      
      // Save to local storage only if preferences are allowed
      if (typeof window !== 'undefined' && preferencesAllowed) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove item from localStorage
  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Effect to sync with other tabs/windows
  useEffect(() => {
    if (!preferencesAllowed) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    // Listen for changes in other tabs/windows
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, preferencesAllowed])

  return [storedValue, setValue, removeValue] as const
}