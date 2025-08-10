import { forwardRef, useId, useState, useEffect } from 'react'

function Select(
	{ options, label, className = '', value, onChange, ...props },
	ref
) {
	const id = useId()

	// If options are status-related (active/inactive), render as toggle
	if (
		options &&
		options.length === 2 &&
		options.includes('active') &&
		options.includes('inactive')
	) {
		const [isActive, setIsActive] = useState(value === 'active')

		// Update internal state when value prop changes
		useEffect(() => {
			setIsActive(value === 'active')
		}, [value])

		const handleToggle = () => {
			const newValue = !isActive
			const newStatus = newValue ? 'active' : 'inactive'
			setIsActive(newValue)

			// Create a synthetic event for react-hook-form
			const syntheticEvent = {
				target: {
					value: newStatus,
					name: props.name,
				},
			}

			// Call both onChange handlers
			if (onChange) {
				onChange(syntheticEvent)
			}
			if (props.onChange) {
				props.onChange(syntheticEvent)
			}
		}

		return (
			<div className="w-full group">
				{label && (
					<label
						htmlFor={id}
						className="inline-block mb-3 pl-1 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300"
					>
						{label}
					</label>
				)}

				{/* Toggle Container */}
				<div className="relative">
					<div className="flex items-center justify-between p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-purple-400/50 dark:hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
						{/* Status Text */}
						<div className="flex items-center space-x-3">
							<div
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									isActive
										? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/30'
										: 'bg-gradient-to-r from-red-400 to-rose-500 shadow-lg shadow-red-400/30'
								}`}
							>
								<div
									className={`w-full h-full rounded-full ${
										isActive ? 'bg-green-400' : 'bg-red-400'
									}`}
								></div>
							</div>
							<span
								className={`font-medium transition-colors duration-300 ${
									isActive
										? 'text-green-700 dark:text-green-400'
										: 'text-red-700 dark:text-red-400'
								}`}
							>
								{isActive ? 'Active' : 'Inactive'}
							</span>
						</div>

						{/* Toggle Switch */}
						<button
							type="button"
							onClick={handleToggle}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${
								isActive
									? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30'
									: 'bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700'
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
									isActive ? 'translate-x-6' : 'translate-x-1'
								}`}
							>
								{/* Icon inside toggle */}
								<div
									className={`w-full h-full flex items-center justify-center transition-all duration-300`}
								>
									{isActive ? (
										<svg
											className="w-2.5 h-2.5 text-green-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<svg
											className="w-2.5 h-2.5 text-red-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									)}
								</div>
							</span>
						</button>
					</div>

					{/* Hidden input for form compatibility */}
					<input
						type="hidden"
						ref={ref}
						value={isActive ? 'active' : 'inactive'}
						onChange={() => {}} // Controlled by toggle
						{...props}
					/>
				</div>

				{/* Helper text */}
				<div className="mt-2 px-1">
					<p className="text-xs text-slate-500 dark:text-slate-400">
						{isActive
							? 'Your post will be visible to all users'
							: 'Your post will be hidden from public view'}
					</p>
				</div>
			</div>
		)
	}

	// Fallback to regular select for other options
	return (
		<div className="w-full group">
			{label && (
				<label
					htmlFor={id}
					className="inline-block mb-3 pl-1 text-sm font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors duration-300"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<div className="relative">
					<select
						id={id}
						value={value}
						onChange={onChange}
						{...props}
						ref={ref}
						className={`w-full px-4 py-3.5 pr-12 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 outline-none border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-purple-400/50 dark:hover:border-purple-500/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 backdrop-blur-md shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer font-medium hover:bg-white/95 dark:hover:bg-slate-800/95 ${className}`}
						style={{
							backgroundImage: 'none',
							WebkitAppearance: 'none',
							MozAppearance: 'none',
						}}
					>
						{options?.map(option => (
							<option
								key={option}
								value={option}
								className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-2 px-4"
							>
								{option.charAt(0).toUpperCase() + option.slice(1)}
							</option>
						))}
					</select>

					<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
						<div className="relative">
							<svg
								className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 group-hover:text-purple-500 transition-all duration-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>

					<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
				</div>
			</div>
		</div>
	)
}

export default forwardRef(Select)
