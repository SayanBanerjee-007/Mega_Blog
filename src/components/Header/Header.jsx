import React from 'react'
import { Container, Logo, LogoutButton, ThemeToggle } from '../index'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
	const authStatus = useSelector(state => state.auth.status)
	const navigate = useNavigate()
	const navItems = [
		{
			name: 'Home',
			slug: '/',
			active: true,
		},
		{
			name: 'Login',
			slug: '/login',
			active: !authStatus,
		},
		{
			name: 'Signup',
			slug: '/signup',
			active: !authStatus,
		},
		{
			name: 'My Posts',
			slug: '/my-posts',
			active: authStatus,
		},
		{
			name: 'Add Post',
			slug: '/add-post',
			active: authStatus,
		},
	]
	return (
		<header className="sticky top-0 z-50 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800 backdrop-blur-lg border-b border-blue-200/30 dark:border-purple-500/30 shadow-lg">
			<Container>
				<nav className="flex items-center justify-between">
					<div className="flex items-center group">
						<Link
							to="/"
							className="relative transition-all duration-200 hover-scale"
						>
							<div className="relative">
								<Logo width="70px" />
							</div>
						</Link>
						<div className="ml-4 hidden md:block">
							<h1 className="text-xl font-bold text-white">
								Mega Blog
							</h1>
						</div>
					</div>
					<ul className="flex items-center space-x-2">
						{navItems.map(item =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className="relative px-5 py-2 text-white font-medium transition-all duration-200 hover:scale-105 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 shadow-md hover:shadow-lg"
									>
										{item.name}
									</button>
								</li>
							) : null
						)}
						<li className="ml-2">
							<ThemeToggle />
						</li>
						{authStatus && (
							<li>
								<LogoutButton />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	)
}

export default Header
