import React from 'react'
import { BounceLoader } from 'react-spinners'

function LoaderSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <BounceLoader color="#ff0000" size={80} />
    </div>
  )
}

export default LoaderSpinner
