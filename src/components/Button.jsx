import React from 'react'

function Button({
	children,
	type = 'button',
	bgColor = 'bg-gradient-to-r from-purple-600 to-indigo-600',
	textColor = 'text-white',
	className = '',
	...props
}) {
	return (
		<button
			className={`relative px-6 py-3 rounded-xl ${bgColor} ${textColor} font-semibold transition-all duration-200 hover-scale shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 hover:border-white/40 ${className}`}
			type={type}
			{...props}
		>
			<span className="relative z-10 flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	)
}

export default Button
