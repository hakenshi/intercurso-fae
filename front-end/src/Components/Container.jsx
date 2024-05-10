import React from 'react'

export const Container = ({children}) => {
  return (
        <div className="my-5">
        <div className='flex flex-col w-[80vw] h-[85vh] bg-card-white-1 rounded-lg'>
        {children}
        </div>
      </div>  
      )
}
