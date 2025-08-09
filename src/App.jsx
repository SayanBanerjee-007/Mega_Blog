import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { useEffect } from 'react'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		authService.getCurrentUser().then(userData => {
			if (userData) {
				dispatch(login({ userData }))
			} else {
				dispatch(logout())
			}
		})
	}, [])

	return (
		<ThemeProvider>
			<div className="main-container">
				<div className="bg-decoration">
					<div className="bg-blob-1"></div>
					<div className="bg-blob-2"></div>
				</div>

				<div className="content-wrapper">
					<Header />
					<main className="main-content">
						<div className="content-box">
							<Outlet />
						</div>
					</main>
					<div className="mt-auto">
						<Footer />
					</div>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
