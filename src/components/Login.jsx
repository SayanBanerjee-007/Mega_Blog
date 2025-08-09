import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { register, handleSubmit } = useForm()
	const [error, setError] = useState('')
	const login = async data => {
		setError('')
		try {
			const session = await authService.login(data)
			if (session) {
				const userData = await authService.getCurrentUser()
				if (userData) dispatch(authLogin(userData))
				navigate('/')
			}
		} catch (error) {
			setError(error.message)
		}
	}
	const handleError = errors => {
		setError(Object.entries(errors)[0][1].message)
	}
	return (
		<div className="flex items-center justify-center w-full min-h-[70vh] p-4">
			<div className="relative">
				<div className="mx-auto w-full max-w-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl">
					{/* Logo section */}
					<div className="mb-6 flex justify-center">
						<span className="inline-block w-full max-w-[100px]">
							<Logo width="100%" />
						</span>
					</div>

					{/* Title */}
					<h2 className="text-center text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
						Welcome Back
					</h2>
					<p className="text-center text-base text-slate-600 dark:text-slate-400 mb-2">
						Login To Your Account
					</p>

					{/* Sign up link */}
					<p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
						Don&apos;t have any account?&nbsp;
						<Link
							to="/signup"
							className="font-medium text-purple-600 dark:text-purple-400 transition-colors duration-200 hover:text-purple-700 dark:hover:text-purple-300 hover:underline"
						>
							Sign Up
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
						onSubmit={handleSubmit(login, handleError)}
						className="mt-6 space-y-4"
					>
						<div className="space-y-4">
							<Input
								label="Email Address"
								placeholder="Enter your email"
								type="email"
								{...register('email', {
									required: {
										value: true,
										message: 'Email is required',
									},
									validate: {
										matchPattern: value =>
											/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
												value
											) || 'Email address must be a valid address',
									},
								})}
							/>
							<Input
								label="Password"
								type="password"
								placeholder="Enter your password"
								{...register('password', {
									required: {
										value: true,
										message: 'Password is required',
									},
									minLength: {
										value: 8,
										message:
											'Password must be of at least 8 characters',
									},
								})}
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
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
									/>
								</svg>
								Sign In
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
