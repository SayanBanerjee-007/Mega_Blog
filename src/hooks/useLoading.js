import { useState, useCallback } from 'react'

/**
 * Custom hook for managing loading states
 * @param {boolean} initialState - Initial loading state
 * @returns {object} - { loading, startLoading, stopLoading, withLoading }
 */
export const useLoading = (initialState = false) => {
	const [loading, setLoading] = useState(initialState)

	const startLoading = useCallback(() => {
		setLoading(true)
	}, [])

	const stopLoading = useCallback(() => {
		setLoading(false)
	}, [])

	// Wrapper function that automatically handles loading states
	const withLoading = useCallback(
		async asyncFunction => {
			try {
				startLoading()
				const result = await asyncFunction()
				return result
			} catch (error) {
				throw error
			} finally {
				stopLoading()
			}
		},
		[startLoading, stopLoading]
	)

	return {
		loading,
		startLoading,
		stopLoading,
		withLoading,
	}
}

/**
 * Custom hook for managing multiple loading states
 * @param {object} initialStates - Object with initial loading states
 * @returns {object} - Loading state management functions
 */
export const useMultipleLoading = (initialStates = {}) => {
	const [loadingStates, setLoadingStates] = useState(initialStates)

	const setLoading = useCallback((key, value) => {
		setLoadingStates(prev => ({
			...prev,
			[key]: value,
		}))
	}, [])

	const startLoading = useCallback(
		key => {
			setLoading(key, true)
		},
		[setLoading]
	)

	const stopLoading = useCallback(
		key => {
			setLoading(key, false)
		},
		[setLoading]
	)

	const isLoading = useCallback(
		key => {
			return Boolean(loadingStates[key])
		},
		[loadingStates]
	)

	const isAnyLoading = useCallback(() => {
		return Object.values(loadingStates).some(Boolean)
	}, [loadingStates])

	const withLoading = useCallback(
		async (key, asyncFunction) => {
			try {
				startLoading(key)
				const result = await asyncFunction()
				return result
			} catch (error) {
				throw error
			} finally {
				stopLoading(key)
			}
		},
		[startLoading, stopLoading]
	)

	return {
		loadingStates,
		setLoading,
		startLoading,
		stopLoading,
		isLoading,
		isAnyLoading,
		withLoading,
	}
}
