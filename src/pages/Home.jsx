import { useEffect, useState, useCallback } from 'react'
import { databaseService } from '../services'
import {
	Container,
	PostCard,
	SearchAndFilter,
	SkeletonLoader,
	HeroSection,
} from '../components'
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
		[sortBy]
	)

	useEffect(() => {
		if (authStatus) {
			setPosts([]) // Clear existing posts when sort changes
			setOffset(0) // Reset offset
			setHasMore(true) // Reset hasMore
			loadPosts(false) // Load fresh data
		}
	}, [authStatus, sortBy, loadPosts])

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
		return <HeroSection />
	}

	// UI for logged-in users - Always show search/filter
	return (
		<Container>
			{/* Header Section */}
			<div className="mb-8 text-center">
				<h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
					Discover Amazing Stories
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Explore the latest posts from our community of writers
				</p>
				<div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full max-w-xs mx-auto mt-4"></div>
			</div>

			{/* Search and Filter Component - Always visible */}
			<SearchAndFilter
				searchTerm={searchTerm}
				onSearchChange={e => setSearchTerm(e.target.value)}
				sortBy={sortBy}
				onSortChange={e => setSortBy(e.target.value)}
				placeholder="Search posts by title or content..."
				searchResults={searchTerm ? filteredPosts.length : null}
				onClearSearch={() => setSearchTerm('')}
			/>

			{/* Stats - Always visible */}
			<div className="mb-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700 inline-block">
				<span className="text-sm text-slate-600 dark:text-slate-400">
					Available Posts:{' '}
				</span>
				<span className="font-semibold text-slate-800 dark:text-white">
					{posts.length}
				</span>
			</div>

			{/* Posts Content Area */}
			{renderPostsContent()}
		</Container>
	)

	// Render posts content based on different states
	function renderPostsContent() {
		// Initial loading state
		if (loading && posts.length === 0) {
			return <SkeletonLoader count={8} />
		}

		// No posts available state
		if (posts.length === 0 && !loading) {
			return (
				<div className="text-center py-12">
					<div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
						<svg
							className="w-16 h-16 text-white"
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
						<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
							Create The First Post
						</button>
					</Link>
				</div>
			)
		}

		// Search results empty state
		if (filteredPosts.length === 0 && !loading) {
			return (
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
						No posts found
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-6">
						Try adjusting your search terms or browse all posts
					</p>
					<button
						onClick={() => setSearchTerm('')}
						className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
					>
						Clear search
					</button>
				</div>
			)
		}

		// Posts grid - default state
		return (
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
						<p className="text-slate-600 dark:text-slate-400 text-sm">
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
		)
	}
}

export default Home
