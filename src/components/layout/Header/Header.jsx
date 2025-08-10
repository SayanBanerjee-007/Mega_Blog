import { Container } from '../'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTheme } from '../../../contexts'
import { Button, Logo } from '../../ui'

function Header() {
	const authStatus = useSelector(state => state.auth.status)
	const userData = useSelector(state => state.auth.userData)
	const navigate = useNavigate()
	const { theme, toggleTheme } = useTheme()

	// Get user first character for avatar
	const getUserInitial = () => {
		if (userData?.name) {
			return userData.name.charAt(0).toUpperCase()
		}
		return userData?.email?.charAt(0)?.toUpperCase() || 'U'
	}

	// Navigation buttons configuration
	const navButtons = [
		{
			id: 'home',
			onClick: () => navigate('/'),
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
		},
		{
			id: 'create-post',
			onClick: () => navigate('/add-post'),
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4v16m8-8H4"
					/>
				</svg>
			),
		},
		{
			id: 'profile',
			onClick: () => navigate('/account'),
			icon: (
				<span className="text-sm font-bold">{getUserInitial()}</span>
			),
			className:
				'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0',
		},
		{
			id: 'my-posts',
			onClick: () => navigate('/my-posts'),
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
					/>
				</svg>
			),
		},
		{
			id: 'theme-toggle',
			onClick: toggleTheme,
			icon:
				theme === 'light' ? (
					<svg
						className="w-5 h-5 text-purple-100"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
					</svg>
				) : (
					<svg
						className="w-5 h-5 text-yellow-200"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
							clipRule="evenodd"
						/>
					</svg>
				),
			ariaLabel: `Switch to ${
				theme === 'light' ? 'dark' : 'light'
			} mode`,
		},
	]

	return (
		<header className="fixed bottom-0 md:sticky md:top-0 left-0 right-0 z-50 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800 backdrop-blur-lg border-t md:border-t-0 md:border-b border-blue-200/30 dark:border-purple-500/30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-lg">
			<Container>
				<nav className="flex items-center justify-between max-w-7xl mx-auto">
					{/* Left Side - Logo (Only when logged out) */}
					{!authStatus && (
						<div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
							<Logo />
							<div className="hidden md:block">
								<h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
									Mega Blog
								</h1>
								<p className="text-xs text-white/70 -mt-0.5">
									Your thoughts, amplified
								</p>
							</div>
						</div>
					)}

					{/* Navigation Buttons */}
					<div
						className={`flex items-center min-w-0 flex-shrink-0 ${
							authStatus
								? 'justify-evenly w-full max-w-md mx-auto'
								: 'space-x-2 ml-auto'
						}`}
					>
						{authStatus ? (
							/* Logged In State - Instagram-style Top Navigation */
							navButtons.map(button => (
								<Button
									key={button.id}
									variant="navbar"
									size="icon"
									onClick={button.onClick}
									className={button.className}
									aria-label={button.ariaLabel}
								>
									{button.icon}
								</Button>
							))
						) : (
							/* Logged Out State */
							<>
								<Button
									variant="secondary"
									size="md"
									onClick={() => navigate('/login')}
								>
									Login
								</Button>
								<Button
									variant="gradient"
									size="md"
									onClick={() => navigate('/signup')}
								>
									Sign Up
								</Button>
							</>
						)}
					</div>
				</nav>
			</Container>
		</header>
	)
}

export default Header
