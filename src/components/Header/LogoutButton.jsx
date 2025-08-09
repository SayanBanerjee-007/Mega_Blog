import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const logoutHandler = () => {
		authService
			.logout()
			.then(() => {
				dispatch(logout())
				navigate('/')
			})
			.catch(error => {
				console.log('Error at LogoutButton.jsx', error)
			})
	}
	return (
		<button
			className="relative px-5 py-2 text-white font-medium transition-all duration-200 hover-scale rounded-xl border border-red-400/40 hover:border-red-400/60 backdrop-blur-sm bg-red-500/70 hover:bg-red-600/80 shadow-md hover:shadow-lg"
			onClick={logoutHandler}
		>
			<span className="flex items-center gap-2">
				<svg
					className="w-4 h-4"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
						clipRule="evenodd"
					/>
				</svg>
				Logout
			</span>
		</button>
	)
}

export default LogoutButton
