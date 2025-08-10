/**
 * Common validation rules for react-hook-form
 */

export const validationRules = {
	email: {
		required: {
			value: true,
			message: 'Email is required',
		},
		validate: {
			matchPattern: value =>
				/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
				'Email address must be a valid address',
		},
	},
	password: {
		required: {
			value: true,
			message: 'Password is required',
		},
		minLength: {
			value: 8,
			message: 'Password must be at least 8 characters',
		},
	},
	name: {
		required: {
			value: true,
			message: 'Name is required',
		},
		minLength: {
			value: 2,
			message: 'Name must be at least 2 characters',
		},
	},
	title: {
		required: {
			value: true,
			message: 'Title is required',
		},
		minLength: {
			value: 5,
			message: 'Title must be at least 5 characters',
		},
	},
	content: {
		required: {
			value: true,
			message: 'Content is required',
		},
	},
}
