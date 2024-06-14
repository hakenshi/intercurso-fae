import React from 'react'
import { CardTime } from './CardTime'

export const CardTimeDefault = ({time1, time2, modalidade}) => {
  return (
    <div className="flex justify-center text-white p-4">

      <div className='flex flex-col justify-between items-center bg-gradient-to-tr from-unifae-green-1 to-unifae-green-3 rounded-lg w-full p-4'>
      <h3 className='font-semibold text-2xl mb-5'>{modalidade}</h3>
          <div className='flex w-full justify-between items-center'>
            <CardTime img={time1.image} nome={time1.nome} />
            <p>X</p>
            <CardTime img={time2.image} nome={time2.nome} />
          </div>
      </div>
    </div>
  )
}
