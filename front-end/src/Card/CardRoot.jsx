import React from 'react'

export const CardRoot = ({children}) => {
  return (
    <div className='w-96 h-96 text-center bg-white rounded-lg space-y-5 shadow-md hover:shadow-lg border border-collapse border-unifae-green-1'>
        {children}
    </div>
  )
}
