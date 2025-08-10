import { useNavigate } from 'react-router-dom'

function Logo({ width = '100px' }) {
	const navigate = useNavigate()

	return (
		<button
			onClick={() => navigate('/')}
			className="relative flex gap-3 items-center text-white transition-all duration-200 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 shadow-md hover:shadow-lg group"
		>
			{/* Logo Image */}
			<div className="relative z-10">
				<img
					src="/logo.png"
					alt="MegaBlog Logo"
					className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/20"
				/>
			</div>
		</button>
	)
}

export default Logo
