/**
 * Transforms a string into a URL-friendly slug
 * @param {string} value - The string to transform
 * @returns {string} URL-friendly slug
 */
export const slugTransform = value => {
	if (value && typeof value === 'string') {
		return value
			.trim()
			.toLowerCase()
			.replace(/[^a-zA-Z\d\s]+/g, '-')
			.replace(/\s/g, '-')
	}
	return ''
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = email => {
	return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
	if (text.length <= length) return text
	return text.substring(0, length) + '...'
}

/**
 * Formats date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = date => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}
