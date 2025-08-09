import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
	return (
		<footer className="relative py-4 bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 dark:from-black dark:via-purple-900 dark:to-black border-t border-blue-200/50 dark:border-purple-400/20">
			<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo Section */}
					<div className="flex items-center">
						<div className="p-1 rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-blue-300/30 dark:border-white/10">
							<Logo width="50px" />
						</div>
					</div>

					{/* Navigation Links */}
					<div className="flex items-center gap-6 text-sm">
						<Link
							to="/"
							className="relative group text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200"
						>
							<span className="relative z-10">Home</span>
							<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-purple-400 dark:to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
						</Link>
						<Link
							to="/all-posts"
							className="relative group text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200"
						>
							<span className="relative z-10">All Posts</span>
							<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-purple-400 dark:to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
						</Link>
						<Link
							to="/add-post"
							className="relative group text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-all duration-200"
						>
							<span className="relative z-10">Add Post</span>
							<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-purple-400 dark:to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
						</Link>
					</div>

					{/* Copyright */}
					<div className="text-right">
						<div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
							<span>&copy; {new Date().getFullYear()}</span>
							<div className="w-1 h-1 bg-blue-500 dark:bg-purple-400 rounded-full animate-pulse-fast"></div>
							<span className="text-blue-600 dark:text-purple-400 font-medium">
								Mega Blog
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
