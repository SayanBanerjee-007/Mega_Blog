import { Input, Select } from '../ui'

function SearchAndFilter({
	searchTerm,
	onSearchChange,
	sortBy,
	onSortChange,
	statusFilter,
	onStatusChange,
	placeholder = 'Search posts by title or content...',
	showStatusFilter = false,
	searchResults = null,
	onClearSearch = null,
}) {
	const handleClearSearch = () => {
		if (onClearSearch) {
			onClearSearch()
		} else if (onSearchChange) {
			onSearchChange({ target: { value: '' } })
		}
	}

	return (
		<div className="mb-8 space-y-4">
			{/* Search and Filter Section */}
			<div className="space-y-4 lg:space-y-0 lg:flex lg:items-end lg:gap-6">
				<div className="flex-1 relative">
					<Input
						type="text"
						placeholder={placeholder}
						value={searchTerm}
						onChange={onSearchChange}
						className="pl-12 pr-10"
					/>
					{/* Search Icon */}
					<svg
						className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
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
					{/* Clear Search Button */}
					{searchTerm && (
						<button
							onClick={handleClearSearch}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
							title="Clear search"
						>
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
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					)}
				</div>

				{showStatusFilter && (
					<div className="lg:w-48">
						<Select
							options={['all', 'active', 'inactive']}
							value={statusFilter}
							onChange={onStatusChange}
							label="Status"
						/>
					</div>
				)}

				<div className="lg:w-48">
					<Select
						options={['newest', 'oldest']}
						value={sortBy}
						onChange={onSortChange}
						label="Sort by"
					/>
				</div>
			</div>

			{/* Search Results Count and Filter Tags */}
			{(searchTerm ||
				(showStatusFilter && statusFilter !== 'all')) && (
				<div className="flex flex-wrap items-center gap-3">
					{searchTerm && searchResults !== null && (
						<div className="bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-blue-200 dark:border-blue-700">
							<span className="text-sm text-blue-600 dark:text-blue-400">
								Found {searchResults} post
								{searchResults !== 1 ? 's' : ''}
								{searchTerm && ` matching "${searchTerm}"`}
							</span>
						</div>
					)}

					{showStatusFilter && statusFilter !== 'all' && (
						<div className="bg-purple-50 dark:bg-purple-900/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-purple-200 dark:border-purple-700">
							<span className="text-sm text-purple-600 dark:text-purple-400">
								Status: {statusFilter}
							</span>
						</div>
					)}

					{sortBy !== 'newest' && (
						<div className="bg-green-50 dark:bg-green-900/30 backdrop-blur-sm rounded-lg px-3 py-1 border border-green-200 dark:border-green-700">
							<span className="text-sm text-green-600 dark:text-green-400">
								Sort: {sortBy}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default SearchAndFilter
