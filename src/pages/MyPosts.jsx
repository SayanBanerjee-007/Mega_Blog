import { useState, useEffect, useCallback } from 'react'
import { Container, PostCard, SearchAndFilter } from '../components'
import databaseService from '../appwrite/database'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function AllPosts() {
	const [posts, setPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const [sortBy, setSortBy] = useState('newest')
	const [hasMore, setHasMore] = useState(true)
	const [offset, setOffset] = useState(0)

	const userData = useSelector(state => state.auth.userData)
	const POSTS_PER_PAGE = 12

	const loadPosts = useCallback(
		async (isLoadMore = false) => {
			if (!userData) return

			setLoading(true)
			try {
				const currentOffset = isLoadMore ? offset : 0
				const queries = [
					Query.equal('userId', userData.$id), // Only get current user's posts
					Query.orderDesc('$createdAt'),
					Query.limit(POSTS_PER_PAGE),
					Query.offset(currentOffset),
				]

				if (sortBy === 'oldest') {
					queries[1] = Query.orderAsc('$createdAt')
				}

				// Add status filter if not 'all'
				if (statusFilter !== 'all') {
					queries.push(Query.equal('status', statusFilter))
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
		[userData, offset, sortBy, statusFilter]
	)

	useEffect(() => {
		if (userData) {
			loadPosts()
		}
	}, [userData, sortBy, statusFilter])

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
				userData
			) {
				loadPosts(true)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [loading, hasMore, userData, loadPosts])

	if (loading && posts.length === 0) {
		return (
			<Container>
				<div className="text-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
					<p className="mt-4 text-slate-600 dark:text-slate-400">
						Loading your posts...
					</p>
				</div>
			</Container>
		)
	}

	return (
		<Container>
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
							My Posts
						</h1>
						<p className="text-slate-600 dark:text-slate-400">
							Manage and edit all your blog posts
						</p>
					</div>
					<Link to="/add-post">
						<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
							<svg
								className="w-5 h-5 mr-2 inline"
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
							Create New Post
						</button>
					</Link>
				</div>
				<div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full max-w-xs"></div>
			</div>

			{/* Search and Filter Component */}
			<SearchAndFilter
				searchTerm={searchTerm}
				onSearchChange={e => setSearchTerm(e.target.value)}
				sortBy={sortBy}
				onSortChange={e => setSortBy(e.target.value)}
				statusFilter={statusFilter}
				onStatusChange={e => setStatusFilter(e.target.value)}
				placeholder="Search your posts by title or content..."
				showStatusFilter={true}
				searchResults={searchTerm ? filteredPosts.length : null}
				onClearSearch={() => setSearchTerm('')}
			/>

			{/* Stats */}
			<div className="mb-6">
				<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700 inline-block">
					<span className="text-sm text-slate-600 dark:text-slate-400">
						Total Posts:{' '}
					</span>
					<span className="font-semibold text-slate-800 dark:text-white">
						{posts.length}
					</span>
				</div>
			</div>

			{/* Posts Grid or Empty State */}
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
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
						{searchTerm ? 'No posts found' : 'No posts yet'}
					</h2>
					<p className="text-slate-600 dark:text-slate-400 mb-6">
						{searchTerm
							? 'Try adjusting your search terms or clear the filters'
							: 'Start your blogging journey by creating your first post!'}
					</p>
					{searchTerm ? (
						<button
							onClick={() => setSearchTerm('')}
							className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							Clear search
						</button>
					) : (
						<Link to="/add-post">
							<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
								Create Your First Post
							</button>
						</Link>
					)}
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredPosts.map(post => (
							<div
								key={post.$id}
								className="transform hover:scale-105 transition-all duration-300 relative group"
							>
								<PostCard {...post} />
								{/* Status indicator */}
								<div className="absolute top-2 left-2 z-10">
									<span
										className={`px-2 py-1 text-xs font-medium rounded-full ${
											post.status === 'active'
												? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
												: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
										}`}
									>
										{post.status}
									</span>
								</div>
								{/* Edit button */}
								<Link
									to={`/edit-post/${post.$id}`}
									className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
								>
									<button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg">
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</button>
								</Link>
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
								You've reached the end! That's all your posts.
							</p>
						</div>
					)}
				</>
			)}
		</Container>
	)
}

export default AllPosts
