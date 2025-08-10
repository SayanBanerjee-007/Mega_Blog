import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Button } from '../components'
import { authService } from '../services'
import { logout } from '../store'

function Account() {
	const userData = useSelector(state => state.auth.userData)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			await authService.logout()
			dispatch(logout())
			navigate('/')
		} catch (error) {
			console.log('Error during logout:', error)
		}
	}

	const getUserInitials = () => {
		if (userData?.name) {
			return userData.name
				.split(' ')
				.map(n => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		}
		return userData?.email?.[0]?.toUpperCase() || 'U'
	}

	const formatDate = dateString => {
		if (!dateString) return 'Not available'
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		} catch (error) {
			return 'Invalid date'
		}
	}

	return (
		<Container>
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
					{/* Cover Section */}
					<div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

					{/* Profile Section */}
					<div className="relative px-6 pb-6">
						{/* Avatar */}
						<div className="absolute -top-16 left-6">
							<div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white dark:border-slate-800">
								{getUserInitials()}
							</div>
						</div>

						{/* User Info */}
						<div className="pt-20">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
										{userData?.name || 'User'}
									</h1>
									<p className="text-gray-600 dark:text-gray-400 text-lg">
										{userData?.email}
									</p>
								</div>
								<div className="mt-4 sm:mt-0">
									<Button
										variant="secondary"
										size="md"
										onClick={handleLogout}
										className="flex items-center gap-2"
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
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
										Logout
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Account Details */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Account Information */}
					<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Account Information
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Full Name
								</label>
								<p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
									{userData?.name || 'Not provided'}
								</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Email Address
								</label>
								<p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
									{userData?.email || 'Not provided'}
								</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									User ID
								</label>
								<p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 px-3 py-2 rounded-lg font-mono text-sm">
									{userData?.$id || 'Not available'}
								</p>
							</div>
						</div>
					</div>

					{/* Account Status */}
					<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Account Status
						</h2>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Account Status
								</label>
								<div className="flex items-center">
									<div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
									<p className="text-green-600 dark:text-green-400 font-medium">
										Active
									</p>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Email Verified
								</label>
								<div className="flex items-center">
									<div
										className={`w-3 h-3 rounded-full mr-2 ${
											userData?.emailVerification
												? 'bg-green-500'
												: 'bg-yellow-500'
										}`}
									></div>
									<p
										className={`font-medium ${
											userData?.emailVerification
												? 'text-green-600 dark:text-green-400'
												: 'text-yellow-600 dark:text-yellow-400'
										}`}
									>
										{userData?.emailVerification
											? 'Verified'
											: 'Pending Verification'}
									</p>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									Account Created
								</label>
								<p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
									{formatDate(userData?.$createdAt)}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Coming Soon Section */}
				<div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-6">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						Coming Soon
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-center">
							<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
								<svg
									className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
							<h3 className="font-medium text-gray-900 dark:text-white mb-1">
								Edit Profile
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Update your personal information
							</p>
						</div>

						<div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-center">
							<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
								<svg
									className="w-6 h-6 text-green-600 dark:text-green-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<h3 className="font-medium text-gray-900 dark:text-white mb-1">
								Security
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Change password & 2FA
							</p>
						</div>

						<div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-center">
							<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
								<svg
									className="w-6 h-6 text-purple-600 dark:text-purple-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
									/>
								</svg>
							</div>
							<h3 className="font-medium text-gray-900 dark:text-white mb-1">
								Preferences
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Customize your experience
							</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Account
