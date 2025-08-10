import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false, error: null, errorInfo: null }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// Log the error to console or error reporting service
		console.error('ErrorBoundary caught an error:', error, errorInfo)
		this.setState({
			error: error,
			errorInfo: errorInfo,
		})
	}

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			return (
				<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
					<div className="max-w-md w-full mx-4">
						<div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-red-200 dark:border-red-800">
							{/* Error Icon */}
							<div className="flex justify-center mb-6">
								<div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-red-600 dark:text-red-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
										/>
									</svg>
								</div>
							</div>

							{/* Error Message */}
							<div className="text-center mb-6">
								<h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
									Oops! Something went wrong
								</h1>
								<p className="text-slate-600 dark:text-slate-400">
									We encountered an unexpected error. Don't worry,
									this has been logged and we'll look into it.
								</p>
							</div>

							{/* Action Buttons */}
							<div className="space-y-3">
								<button
									onClick={() => window.location.reload()}
									className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
								>
									Reload Page
								</button>
								<button
									onClick={() => (window.location.href = '/')}
									className="w-full border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
								>
									Go to Home
								</button>
							</div>

							{/* Error Details (Development only) */}
							{process.env.NODE_ENV === 'development' &&
								this.state.error && (
									<details className="mt-6">
										<summary className="cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
											Show error details (Development)
										</summary>
										<div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
											<h4 className="font-medium text-red-800 dark:text-red-300 mb-2">
												Error: {this.state.error.toString()}
											</h4>
											<pre className="text-xs text-red-700 dark:text-red-400 overflow-auto max-h-40">
												{this.state.errorInfo.componentStack}
											</pre>
										</div>
									</details>
								)}
						</div>
					</div>
				</div>
			)
		}

		// If no error, render children normally
		return this.props.children
	}
}

export default ErrorBoundary
