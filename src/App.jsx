import { Header } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contexts'
import { useAuthInit } from './hooks'

function App() {
	useAuthInit()

	return (
		<ThemeProvider>
			<div className="main-container overflow-x-hidden">
				{/* Background decorative elements */}
				<div className="bg-decoration">
					<div className="bg-blob-1"></div>
					<div className="bg-blob-2"></div>
				</div>

				{/* Main content */}
				<div className="content-wrapper">
					<Header />
					<main className="main-content pb-20 md:pb-2">
						<div className="content-box">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default App
