import { Link } from 'react-router-dom'
import { Container } from '../../'

function HeroSection() {
	return (
		<Container>
			<div className="hero-section">
				<div className="relative z-10">
					{/* Animated Welcome Text */}
					<div className="mb-8 space-y-4">
						<h1 className="hero-title animate-pulse-slow">
							Welcome to
						</h1>
						<h2 className="hero-subtitle">Mega Blog</h2>
						<div className="flex items-center justify-center mt-4">
							<div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
							<div className="mx-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
							<div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
						</div>
					</div>

					{/* Subtitle */}
					<p className="hero-description">
						Discover amazing stories, share your thoughts, and connect
						with a community of passionate writers and readers.
					</p>

					{/* Call-to-Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
						<Link to="/signup">
							<button className="btn-primary group">
								<span className="relative z-10 flex items-center">
									<svg
										className="icon-sm mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
										/>
									</svg>
									Get Started Free
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							</button>
						</Link>

						<Link to="/login">
							<button className="btn-secondary">
								<svg
									className="icon-sm mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
									/>
								</svg>
								Sign In
							</button>
						</Link>
					</div>

					{/* Features Grid */}
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="feature-card group">
							<div className="feature-icon bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:scale-110">
								<svg
									className="icon-md"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
							</div>
							<h3 className="feature-title">Write & Share</h3>
							<p className="feature-description">
								Create beautiful blog posts with our rich text editor
								and share your stories with the world.
							</p>
						</div>

						<div className="feature-card group">
							<div className="feature-icon bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110">
								<svg
									className="icon-md"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 className="feature-title">Connect</h3>
							<p className="feature-description">
								Join a vibrant community of writers and readers who
								share your passion for great content.
							</p>
						</div>

						<div className="feature-card group">
							<div className="feature-icon bg-gradient-to-br from-green-500 to-emerald-500 group-hover:scale-110">
								<svg
									className="icon-md"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							</div>
							<h3 className="feature-title">Discover</h3>
							<p className="feature-description">
								Explore trending topics, discover new perspectives,
								and find inspiration in every story.
							</p>
						</div>
					</div>
				</div>

				{/* Background Decorations */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-400/10 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob"></div>
				<div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/20 dark:bg-purple-400/10 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob animation-delay-2000"></div>
				<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400/20 dark:bg-pink-400/10 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl animate-blob animation-delay-4000"></div>
			</div>
		</Container>
	)
}

export default HeroSection
