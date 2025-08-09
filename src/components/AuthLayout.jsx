import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoadingScreen } from './index.js'

function Protected({ children, authentication = true }) {
	const navigate = useNavigate()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const authStatus = useSelector(state => state.auth.status)

	if (authentication && !authStatus) {
		// User needs to be authenticated but isn't - show loading and redirect
		useEffect(() => {
			const timer = setTimeout(() => {
				navigate('/login', { replace: true })
			}, 1000)
			return () => clearTimeout(timer)
		}, [navigate])

		return (
			<LoadingScreen
				title="Authentication Required"
				subtitle="Redirecting to login page..."
			/>
		)
	}

	if (!authentication && authStatus) {
		// User shouldn't be here but is authenticated - redirect to home
		useEffect(() => {
			const timer = setTimeout(() => {
				navigate('/', { replace: true })
			}, 1000)
			return () => clearTimeout(timer)
		}, [navigate])

		return (
			<LoadingScreen
				title="Already Authenticated"
				subtitle="Redirecting to home page..."
			/>
		)
	}

	useEffect(() => {
		setLoading(true)
		const timer = setTimeout(() => {
			setLoading(false)
		}, 500)

		return () => clearTimeout(timer)
	}, [location.pathname])

	if (loading) {
		return (
			<LoadingScreen
				title={authentication ? 'Verifying Access...' : 'Loading...'}
				subtitle={
					authentication
						? 'Please wait while we verify your permissions'
						: 'Preparing your experience'
				}
			/>
		)
	}

	return <>{children}</>
}

export default Protected
