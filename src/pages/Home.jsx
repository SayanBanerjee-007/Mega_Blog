import { useEffect, useState, useCallback } from 'react'
import databaseService from '../appwrite/database'
import { Container, PostCard, SearchAndFilter } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Query } from 'appwrite'

function Home() {
	const [posts, setPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('newest')
	const [hasMore, setHasMore] = useState(true)
	const [offset, setOffset] = useState(0)
	const authStatus = useSelector(state => state.auth.status)

	const POSTS_PER_PAGE = 12

	const loadPosts = useCallback(
		async (isLoadMore = false) => {
			setLoading(true)
			try {
				const currentOffset = isLoadMore ? offset : 0
				const queries = [
					Query.equal('status', 'active'),
					Query.orderDesc('$createdAt'),
					Query.limit(POSTS_PER_PAGE),
					Query.offset(currentOffset),
				]

				if (sortBy === 'oldest') {
					queries[1] = Query.orderAsc('$createdAt')
				}

				const response = await databaseService.getPosts(queries)

				if (response && response.documents) {
					if (isLoadMore) {
						setPosts(prev => [...prev, ...response.documents])
					} else {
						setPosts(response.documents)
						setOffset(0)
					}
					setHasMore(response.documents.length === POSTS_PER_PAGE)
					setOffset(prev =>
						isLoadMore ? prev + POSTS_PER_PAGE : POSTS_PER_PAGE
					)
				} else {
					if (!isLoadMore) {
						setPosts([])
					}
					setHasMore(false)
				}
			} catch (error) {
				console.error('Error loading posts:', error)
			} finally {
				setLoading(false)
			}
		},
		[offset, sortBy]
	)

	useEffect(() => {
		if (authStatus) {
			loadPosts()
		}
	}, [authStatus, sortBy])

	// Filter posts based on search term
	useEffect(() => {
		if (searchTerm) {
			const filtered = posts.filter(
				post =>
					post.title
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					post.content
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
			)
			setFilteredPosts(filtered)
		} else {
			setFilteredPosts(posts)
		}
	}, [posts, searchTerm])

	// Infinite scroll handler
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop >=
					document.documentElement.offsetHeight - 1000 &&
				!loading &&
				hasMore &&
				authStatus
			) {
				loadPosts(true)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [loading, hasMore, authStatus, loadPosts])

	// Enhanced UI for non-logged-in users
	if (!authStatus) {
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
							Discover amazing stories, share your thoughts, and
							connect with a community of passionate writers and
							readers.
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
									Create beautiful blog posts with our rich text
									editor and share your stories with the world.
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

	// UI for when no posts are available (logged-in users)
	if (posts.length === 0) {
		return (
			<Container>
				<div className="text-center py-12">
					<div className="mb-8">
						<div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
							<svg
								className="icon-lg"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>
						<h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
							No Posts Yet
						</h1>
						<p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
							Be the first to share your story with the world!
						</p>
						<Link to="/add-post">
							<button className="btn-primary">
								Create The First Post
							</button>
						</Link>
					</div>
				</div>
			</Container>
		)
	}

	// UI for displaying posts (logged-in users with posts)
	return (
		<Container>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
					Discover Posts
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Explore amazing stories from our community
				</p>
				<div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full max-w-xs"></div>
			</div>

			{/* Search and Filter Component */}
			<SearchAndFilter
				searchTerm={searchTerm}
				onSearchChange={e => setSearchTerm(e.target.value)}
				sortBy={sortBy}
				onSortChange={e => setSortBy(e.target.value)}
				placeholder="Search posts by title or content..."
				searchResults={searchTerm ? filteredPosts.length : null}
				onClearSearch={() => setSearchTerm('')}
			/>

			{/* Posts Grid */}
			{filteredPosts.length === 0 && !loading ? (
				<div className="text-center py-12">
					<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-12 h-12 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
						{searchTerm ? 'No posts found' : 'No posts yet'}
					</h2>
					<p className="text-slate-600 dark:text-slate-400">
						{searchTerm
							? 'Try adjusting your search terms or browse all posts'
							: 'Be the first to share your story with the community!'}
					</p>
					{searchTerm && (
						<button
							onClick={() => setSearchTerm('')}
							className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							Clear search
						</button>
					)}
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredPosts.map(post => (
							<div
								key={post.$id}
								className="transform hover:scale-105 transition-all duration-300"
							>
								<PostCard {...post} />
							</div>
						))}
					</div>

					{/* Loading indicator */}
					{loading && (
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
							<p className="mt-2 text-slate-600 dark:text-slate-400">
								Loading more posts...
							</p>
						</div>
					)}

					{/* Load more indicator */}
					{!loading && hasMore && filteredPosts.length > 0 && (
						<div className="text-center py-8">
							<p className="text-slate-600 dark:text-slate-400">
								Scroll down to load more posts...
							</p>
						</div>
					)}

					{/* No more posts indicator */}
					{!hasMore && filteredPosts.length > 0 && (
						<div className="text-center py-8">
							<p className="text-slate-600 dark:text-slate-400">
								You've reached the end! That's all the posts we have.
							</p>
						</div>
					)}
				</>
			)}
		</Container>
	)
}

export default Home
