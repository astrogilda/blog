import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

/**
 * A simple button that toggles between light & dark mode.
 */
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Dark Mode"
            className="
        p-2 rounded 
        bg-gray-200 dark:bg-gray-800 
        text-gray-800 dark:text-gray-200
        transition
      "
        >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    )
}
