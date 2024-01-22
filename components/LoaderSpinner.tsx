import React from 'react'
import { ClipLoader } from 'react-spinners'

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
      <ClipLoader color="#d4d4d4" size={80} />
    </div>
  )
}

export default LoaderSpinner
