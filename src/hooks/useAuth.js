import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store'
import { authService } from '../services'

/**
 * Custom hook to initialize authentication state
 */
export const useAuthInit = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		authService
			.getCurrentUser()
			.then(userData => {
				if (userData) {
					dispatch(login({ userData }))
				} else {
					dispatch(logout())
				}
			})
			.catch(() => {
				dispatch(logout())
			})
	}, [dispatch])
}
