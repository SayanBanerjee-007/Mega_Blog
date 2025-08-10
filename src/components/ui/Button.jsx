function Button({
	children,
	type = 'button',
	variant = 'primary', // 'primary', 'secondary', 'navbar', 'icon', 'gradient'
	size = 'md', // 'sm', 'md', 'lg'
	bgColor,
	textColor = 'text-white',
	className = '',
	onClick,
	disabled = false,
	...props
}) {
	// Size variants
	const sizeClasses = {
		sm: 'px-2.5 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
		icon: 'p-3 text-sm w-12 h-12', // Fixed size for icon buttons
	}

	// Variant styles
	const variantClasses = {
		primary:
			bgColor || 'bg-gradient-to-r from-purple-600 to-indigo-600',
		secondary:
			'bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50',
		navbar:
			'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-sm',
		icon: 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-sm',
		gradient:
			bgColor ||
			'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
	}

	// Border radius based on variant
	const radiusClasses = {
		primary: 'rounded-xl',
		secondary: 'rounded-xl',
		navbar: 'rounded-xl',
		icon: 'rounded-xl',
		gradient: 'rounded-xl',
	}

	const baseClasses = `
		relative font-semibold transition-all duration-200
		shadow-md hover:shadow-lg
		${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
		${sizeClasses[size] || sizeClasses.md}
		${variantClasses[variant]}
		${radiusClasses[variant]}
		${textColor}
		${className}
	`
		.trim()
		.replace(/\s+/g, ' ')

	return (
		<button
			className={baseClasses}
			type={type}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			<span className="relative z-10 flex items-center justify-center gap-2">
				{children}
			</span>
		</button>
	)
}

export default Button
