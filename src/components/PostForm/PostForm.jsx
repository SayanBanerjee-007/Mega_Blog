import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import databaseService from '../../appwrite/database'
import storageService from '../../appwrite/storage'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		control,
		getValues,
	} = useForm({
		defaultValues: {
			title: post?.title || '',
			slug: post?.$id || '',
			content: post?.content || '',
			status: post?.status || 'active',
		},
	})

	const navigate = useNavigate()
	const userData = useSelector(state => state.auth.userData)
	const [error, setError] = useState('')

	const submit = async data => {
		setError('')
		try {
			if (post) {
				const file = data.image[0]
					? await storageService.uploadImage(data.image[0])
					: null

				if (file) {
					storageService.deleteImage(post.featuredImage)
				}

				const dbPost = await databaseService.updatePost(post.$id, {
					...data,
					featuredImage: file ? file.$id : undefined,
				})

				if (dbPost) {
					navigate(`/post/${dbPost.$id}`)
				}
			} else {
				const file = await storageService.uploadImage(data.image[0])
				if (file) {
					const fileId = file.$id
					data.featuredImage = fileId
					const dbPost = await databaseService.createPost({
						...data,
						userId: userData.$id,
					})

					if (dbPost) {
						navigate(`/post/${dbPost.$id}`)
					}
				}
			}
		} catch (error) {
			setError(error.message)
		}
	}

	const slugTransform = useCallback(value => {
		if (value && typeof value === 'string')
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-')

		return ''
	}, [])

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title), {
					shouldValidate: true,
				})
			}
		})

		return () => subscription.unsubscribe()
	}, [watch, slugTransform, setValue])

	const handleError = errors => {
		setError('All inputs are required')
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{error && (
				<div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl text-red-700 dark:text-red-300 text-center font-medium backdrop-blur-sm">
					<div className="flex items-center justify-center">
						<svg
							className="w-5 h-5 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
						{error}
					</div>
				</div>
			)}

			<form
				onSubmit={handleSubmit(submit, handleError)}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* Main Content Area */}
				<div className="lg:col-span-2 space-y-6">
					{/* Title Section */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 animate-pulse"></div>
							Post Details
						</h2>
						<div className="space-y-4">
							<Input
								label="Title"
								placeholder="Enter your post title..."
								className="mb-0"
								{...register('title', { required: true })}
							/>
							<Input
								label="Slug"
								placeholder="URL slug (auto-generated)"
								className="mb-0"
								{...register('slug', { required: true })}
								onInput={e => {
									setValue(
										'slug',
										slugTransform(e.currentTarget.value),
										{
											shouldValidate: true,
										}
									)
								}}
							/>
						</div>
					</div>

					{/* Content Editor Section */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 animate-pulse"></div>
							Content Editor
						</h2>
						<div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-inner">
							<RTE
								label=""
								name="content"
								control={control}
								defaultValue={getValues('content')}
							/>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="lg:col-span-1 space-y-6">
					{/* Featured Image Section */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 animate-pulse"></div>
							Featured Image
						</h3>
						<Input
							label=""
							type="file"
							className="mb-4"
							accept="image/png, image/jpg, image/jpeg, image/gif"
							{...register('image', { required: !post })}
						/>
						{post && (
							<div className="mt-4 group">
								<div className="relative overflow-hidden rounded-xl">
									<img
										src={storageService.getImageView(
											post.featuredImage
										)}
										alt={post.title}
										className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
									Current featured image
								</p>
							</div>
						)}
					</div>

					{/* Post Settings */}
					<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
						<h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 animate-pulse"></div>
							Post Settings
						</h3>
						<Select
							options={['active', 'inactive']}
							label="Status"
							className="mb-6"
							{...register('status', { required: true })}
						/>
						<Button
							type="submit"
							bgColor={
								post
									? 'bg-gradient-to-r from-green-500 to-emerald-500'
									: 'bg-gradient-to-r from-blue-500 to-purple-500'
							}
							className={`w-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-medium py-3 ${
								post
									? 'hover:from-green-600 hover:to-emerald-600'
									: 'hover:from-blue-600 hover:to-purple-600'
							}`}
						>
							{post ? '✏️ Update Post' : '📝 Create Post'}
						</Button>
					</div>

					{/* Tips Section */}
					<div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700/50 dark:to-purple-800/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-200/50 dark:border-slate-600/50">
						<h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center">
							<div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mr-3 animate-pulse"></div>
							Writing Tips
						</h3>
						<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
							<li className="flex items-start">
								<span className="text-blue-500 mr-2">•</span>
								Use engaging titles to capture attention
							</li>
							<li className="flex items-start">
								<span className="text-purple-500 mr-2">•</span>
								Add high-quality featured images
							</li>
							<li className="flex items-start">
								<span className="text-green-500 mr-2">•</span>
								Break content into readable sections
							</li>
							<li className="flex items-start">
								<span className="text-orange-500 mr-2">•</span>
								Preview before publishing
							</li>
						</ul>
					</div>
				</div>
			</form>
		</div>
	)
}

export default PostForm
