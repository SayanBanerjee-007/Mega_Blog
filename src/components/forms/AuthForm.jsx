import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../../store'
import { Button, Input, Logo } from '../'
import { authService } from '../../services'
import { validationRules } from '../../utils'

const AuthForm = ({ type = 'login' }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const [error, setError] = useState('')

	const isLogin = type === 'login'

	const submit = async data => {
		setError('')
		try {
			let session
			if (isLogin) {
				session = await authService.login(data)
			} else {
				session = await authService.createAccount(data)
			}

			if (session) {
				const userData = await authService.getCurrentUser()
				if (userData) {
					dispatch(authLogin({ userData }))
					navigate('/')
				}
			}
		} catch (error) {
			setError(error.message || error)
		}
	}

	const handleError = errors => {
		setError(Object.entries(errors)[0][1].message)
	}

	const formConfig = {
		login: {
			title: 'Welcome Back',
			subtitle: 'Login To Your Account',
			buttonText: 'Sign In',
			linkText: "Don't have any account?",
			linkTo: '/signup',
			linkLabel: 'Sign Up',
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
				/>
			),
		},
		signup: {
			title: 'Join Our Community',
			subtitle: 'Create Your Account',
			buttonText: 'Create Account',
			linkText: 'Already have an account?',
			linkTo: '/login',
			linkLabel: 'Log In',
			icon: (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
				/>
			),
		},
	}

	const config = formConfig[type]

	return (
		<div className="flex items-center justify-center w-full min-h-[70vh] p-4">
			<div className="mx-auto w-full max-w-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl">
				{/* Logo section */}
				<div className="mb-6 flex justify-center">
					<span className="w-full max-w-[100px] flex justify-center">
						<Logo width="100%" />
					</span>
				</div>

				{/* Title */}
				<h2 className="text-center text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
					{config.title}
				</h2>
				<p className="text-center text-base text-slate-600 dark:text-slate-400 mb-2">
					{config.subtitle}
				</p>

				{/* Navigation link */}
				<p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
					{config.linkText}&nbsp;
					<Link
						to={config.linkTo}
						className="font-medium text-purple-600 dark:text-purple-400 transition-colors duration-200 hover:text-purple-700 dark:hover:text-purple-300 hover:underline"
					>
						{config.linkLabel}
					</Link>
				</p>

				{/* Error message */}
				{error && (
					<div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl">
						<p className="text-red-600 dark:text-red-400 text-center text-sm">
							{error}
						</p>
					</div>
				)}

				{/* Form */}
				<form
					onSubmit={handleSubmit(submit, handleError)}
					className="mt-6 space-y-4"
				>
					{!isLogin && (
						<Input
							label="Full Name"
							placeholder="Enter your full name"
							{...register('name', validationRules.name)}
						/>
					)}
					<Input
						label="Email Address"
						placeholder="Enter your email"
						type="email"
						{...register('email', validationRules.email)}
					/>
					<Input
						label="Password"
						type="password"
						placeholder="Enter your password"
						{...register('password', validationRules.password)}
					/>
					<Button
						type="submit"
						className="w-full mt-6"
					>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							{config.icon}
						</svg>
						{config.buttonText}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AuthForm
