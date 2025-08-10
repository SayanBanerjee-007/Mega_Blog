function LoadingScreen({ title, subtitle }) {
	return (
		<div className="flex items-center justify-center min-h-full">
			<div className="text-center">
				{/* Loading Spinner */}
				<div className="relative mb-8 flex justify-center">
					<div className="loading-spinner">
						{/* Base circle */}
						<div className="spinner-base"></div>
						{/* Blue spinning arc */}
						<div className="spinner-blue"></div>
						{/* Purple spinning arc */}
						<div className="spinner-purple animation-delay-150"></div>
					</div>
				</div>

				{/* Loading Text */}
				<div className="space-y-2">
					<h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
						{title}
					</h2>
					<p className="text-slate-600 dark:text-slate-400">
						{subtitle}
					</p>
				</div>

				{/* Loading Animation Dots */}
				<div className="flex justify-center space-x-2 mt-6">
					<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
					<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
					<div className="w-2 h-2 bg-pink-500 rounded-full"></div>
				</div>
			</div>
		</div>
	)
}

export default LoadingScreen
