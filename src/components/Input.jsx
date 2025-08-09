import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
	{ label, type = 'text', className = '', ...props },
	ref
) {
	const id = useId()
	return (
		<div className="w-full group">
			{label && (
				<label
					className="inline-block mb-2 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300 group-focus-within:text-purple-600 dark:group-focus-within:text-purple-400 transition-colors duration-200"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none border-2 border-slate-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all duration-200 backdrop-blur-sm shadow-md focus:shadow-lg ${className}`}
				ref={ref}
				{...props}
				id={id}
			/>
		</div>
	)
})

export default Input
