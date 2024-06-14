import React from 'react'

import { images } from '../../assets'

export const CardTime = ({img, nome}) => {

    const foto = img == null ? images.timeFoto : img
    const timeNome = nome == null ? "John Doe" : nome
  return (
    <div className='flex flex-col text-center text-white'>
        <img className='rounded-full w-32 border-2 border-collapse' src={foto} alt={timeNome} />
        <p className='capitalize py-2'>{nome}</p>
    </div>
  )
}
