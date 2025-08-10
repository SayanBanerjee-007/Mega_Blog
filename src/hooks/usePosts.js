import { useState, useEffect, useCallback } from 'react'
import databaseService from '../services/databaseService'

/**
 * Custom hook for fetching posts with search and filter functionality
 */
export const usePosts = (initialQueries = []) => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const fetchPosts = useCallback(
		async (queries = initialQueries) => {
			setLoading(true)
			setError('')
			try {
				const response = await databaseService.getPosts(queries)
				if (response) {
					setPosts(response.documents)
				} else {
					setPosts([])
				}
			} catch (err) {
				setError(err.message || 'Failed to fetch posts')
				setPosts([])
			} finally {
				setLoading(false)
			}
		},
		[initialQueries]
	)

	const searchPosts = useCallback(
		async (searchTerm, additionalQueries = []) => {
			setLoading(true)
			setError('')
			try {
				const response = await databaseService.searchPosts(
					searchTerm,
					additionalQueries
				)
				if (response) {
					setPosts(response.documents)
				} else {
					setPosts([])
				}
			} catch (err) {
				setError(err.message || 'Failed to search posts')
				setPosts([])
			} finally {
				setLoading(false)
			}
		},
		[]
	)

	useEffect(() => {
		fetchPosts()
	}, [fetchPosts])

	return {
		posts,
		loading,
		error,
		fetchPosts,
		searchPosts,
		refetch: () => fetchPosts(),
	}
}
