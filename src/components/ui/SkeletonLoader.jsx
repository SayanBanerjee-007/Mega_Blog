function SkeletonLoader({ count = 8 }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{/* Generate skeleton cards */}
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="relative overflow-hidden bg-gray-300 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 transition-all duration-200 shadow-lg border-2 border-slate-200/60 dark:border-slate-700/50"
				>
					{/* Shimmer overlay for better animation */}
					<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent dark:via-slate-100/5"></div>

					{/* Skeleton Image */}
					<div className="relative w-full justify-center mb-4 overflow-hidden rounded-xl">
						<div className="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-xl animate-pulse"></div>

						{/* Skeleton "Read More" indicator */}
						<div className="absolute top-3 right-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-full w-20 h-6 animate-pulse"></div>
					</div>

					{/* Skeleton Content */}
					<div className="relative z-10">
						{/* Skeleton Title - matches line-clamp-2 */}
						<div className="mb-2 space-y-2">
							<div className="h-5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded w-full animate-pulse"></div>
							<div className="h-5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 rounded w-3/4 animate-pulse"></div>
						</div>

						{/* Skeleton Excerpt - matches line-clamp-3 */}
						<div className="mb-3 space-y-1.5">
							<div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded w-full animate-pulse"></div>
							<div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded w-5/6 animate-pulse"></div>
							<div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded w-2/3 animate-pulse"></div>
						</div>

						{/* Skeleton Meta information */}
						<div className="flex items-center justify-between text-xs">
							{/* Skeleton Date with icon */}
							<div className="flex items-center">
								<div className="w-3 h-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded mr-1 animate-pulse"></div>
								<div className="h-3 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded w-20 animate-pulse"></div>
							</div>

							{/* Skeleton Status badge */}
							<div className="h-6 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-full w-16 animate-pulse"></div>
						</div>

						{/* Skeleton Animated underline */}
						<div className="h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded mt-3 animate-pulse"></div>
					</div>
				</div>
			))}
		</div>
	)
}

export default SkeletonLoader
