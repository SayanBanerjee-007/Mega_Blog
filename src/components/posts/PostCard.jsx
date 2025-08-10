import React from 'react'
import { Link } from 'react-router-dom'
import { storageService } from '../../services'

// Problem with  storage service or database service start at video no 24 at 11 minutes.
function PostCard({
	$id,
	title,
	featuredImage,
	$createdAt,
	status,
	content,
}) {
	// Format date
	const formatDate = dateString => {
		const date = new Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	// Get excerpt from content
	const getExcerpt = (content, length = 120) => {
		if (!content) return ''
		const textContent = content.replace(/<[^>]*>/g, '') // Remove HTML tags
		return textContent.length > length
			? textContent.substring(0, length) + '...'
			: textContent
	}

	return (
		<Link
			to={`/post/${$id}`}
			className="group block"
		>
			<div className="relative overflow-hidden bg-gray-300 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 transition-all duration-200 shadow-lg border-2 border-slate-200/60 dark:border-slate-700/50">
				{/* Image container */}
				<div className="relative w-full justify-center mb-4 overflow-hidden rounded-xl">
					<img
						src={storageService.getImageView(featuredImage)}
						alt={title}
						className="w-full h-48 object-cover rounded-xl transition-all duration-200"
					/>

					{/* Read more indicator */}
					<div className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
						Read More
					</div>
				</div>

				{/* Content */}
				<div className="relative z-10">
					{/* Title */}
					<h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-200 line-clamp-2 mb-2">
						{title}
					</h2>

					{/* Excerpt */}
					{content && (
						<p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-3">
							{getExcerpt(content)}
						</p>
					)}

					{/* Meta information */}
					<div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
						{$createdAt && (
							<span className="flex items-center">
								<svg
									className="w-3 h-3 mr-1"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clipRule="evenodd"
									/>
								</svg>
								{formatDate($createdAt)}
							</span>
						)}
						{status && (
							<span
								className={`px-2 py-1 rounded-full text-xs font-medium ${
									status === 'active'
										? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
										: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
								}`}
							>
								{status}
							</span>
						)}
					</div>

					{/* Animated underline */}
					<div className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-200 origin-left mt-3"></div>
				</div>
			</div>
		</Link>
	)
}

export default PostCard
