import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div
      width={width}
      className="text-center"
    >
      <img
        src="/logo.png"
        alt="LOGO"
        className="w-14 rounded-full border border-solid border-black m-auto"
      />
    </div>
  )
}

export default Logo
