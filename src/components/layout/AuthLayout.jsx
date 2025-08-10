import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
	const navigate = useNavigate()
	const authStatus = useSelector(state => state.auth.status)

	// All hooks must be at the top level - handle redirects with a single useEffect
	useEffect(() => {
		if (authentication && !authStatus) {
			// User needs to be authenticated but isn't - redirect to login
			navigate('/login', { replace: true })
		} else if (!authentication && authStatus) {
			// User shouldn't be here but is authenticated - redirect to home
			navigate('/', { replace: true })
		}
	}, [navigate, authentication, authStatus])

	// Handle different authentication states
	if (authentication && !authStatus) {
		return null
	}

	if (!authentication && authStatus) {
		return null
	}

	return <>{children}</>
}

export default Protected
