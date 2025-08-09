import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
	return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme')
		return (
			savedTheme ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		)
	})

	useEffect(() => {
		localStorage.setItem('theme', theme)

		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
