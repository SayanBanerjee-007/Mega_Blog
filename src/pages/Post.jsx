import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/database'
import storageService from '../appwrite/storage'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
	const [post, setPost] = useState(null)
	const { slug } = useParams()
	const navigate = useNavigate()

	const userData = useSelector(state => state.auth.userData)

	const isAuthor =
		post && userData ? post.userId === userData.$id : false

	useEffect(() => {
		if (slug) {
			databaseService.getPost(slug).then(post => {
				if (post) setPost(post)
				else navigate('/')
			})
		} else navigate('/')
	}, [slug, navigate])

	const deletePost = () => {
		databaseService.deletePost(post.$id).then(status => {
			if (status) {
				storageService.deleteImage(post.featuredImage)
				navigate('/')
			}
		})
	}

	return post ? (
		<Container>
			{/* Hero Image Section */}
			<div className="relative mb-8 group overflow-hidden rounded-2xl shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<img
					src={storageService.getImageView(post.featuredImage)}
					alt={post.title}
					className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
					<h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
						{post.title}
					</h1>
					<div className="flex items-center text-white/80 text-sm">
						<div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
						<span>Published Article</span>
					</div>
				</div>
			</div>

			{/* Content Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-3">
					{/* Title Section for smaller screens */}
					<div className="lg:hidden mb-8">
						<h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
							{post.title}
						</h1>
						<div className="flex items-center text-slate-600 dark:text-slate-400">
							<div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
							<span className="text-sm font-medium">
								Featured Article
							</span>
						</div>
					</div>

					{/* Content Body */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:text-slate-800 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400">
							{parse(post.content)}
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="lg:col-span-1">
					{/* Author Actions */}
					{isAuthor && (
						<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-6">
							<h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
								<div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-2 animate-pulse"></div>
								Author Actions
							</h3>
							<div className="space-y-3">
								<Link
									to={`/edit-post/${post.$id}`}
									className="block"
								>
									<Button
										bgColor="bg-gradient-to-r from-green-500 to-emerald-500"
										className="w-full hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-medium py-3"
									>
										✏️ Edit Post
									</Button>
								</Link>
								<Button
									bgColor="bg-gradient-to-r from-red-500 to-pink-500"
									className="w-full hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-medium py-3"
									onClick={deletePost}
								>
									🗑️ Delete Post
								</Button>
							</div>
						</div>
					)}

					{/* Article Info */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 animate-pulse"></div>
							Article Info
						</h3>
						<div className="space-y-3 text-sm">
							<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
								<span className="text-slate-600 dark:text-slate-400">
									Status
								</span>
								<span className="text-green-600 dark:text-green-400 font-medium flex items-center">
									<div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
									Published
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
								<span className="text-slate-600 dark:text-slate-400">
									Type
								</span>
								<span className="text-blue-600 dark:text-blue-400 font-medium">
									Article
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
								<span className="text-slate-600 dark:text-slate-400">
									ID
								</span>
								<span className="text-purple-600 dark:text-purple-400 font-mono text-xs">
									{post.$id.slice(0, 8)}...
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	) : null
}
