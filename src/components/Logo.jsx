import React from 'react'

function Logo({ width = '100px' }) {
	return (
		<div
			width={width}
			className="text-center group"
		>
			<img
				src="/logo.png"
				alt="LOGO"
				className="w-14 h-14 rounded-full border-2 border-white/40 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-white/60 m-auto object-cover hover-scale"
			/>
		</div>
	)
}

export default Logo
