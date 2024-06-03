import React, { useEffect, useState } from 'react'
import axiosInstance from '../../helper/axios-instance'
import { useStateContext } from '../../Contexts/ContextProvider';
import { Oval } from 'react-loader-spinner';
import { Table } from '../../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

export const MeuTime = () => {

  const [times, setTimes] = useState([])
  const {user} = useStateContext();
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    if(times.length === 0){
      axiosInstance.get(`/times/usuario/${user.id}`)
      .then(({data}) => {
        setTimes(data.data)
        setLoading(false)
      })
      .catch(errors => {
        console.log(errors)
        setLoading(false)
      })
    }
  }, [times, user.id])

  if(loading){
    return(<div className="w-full h-screen flex justify-center items-center"> <Oval visible={true} height="50" width="50" color="#3BBFA7" secondaryColor="#38A69B" /> </div>)
 }

  return (
    <div className="w-full flex items-center flex-col">
      <h1 className='text-cetner p-5 text-3xl font-medium'>Meus Times</h1>
      <Table.Root> 
        <Table.Head titles={['Nome', 'Responsável', 'Modalidade', 'Quantidade de jogadores', ""]} />
        <Table.Body>
        {times.map((time, index) => <tr className='text-center' key={index}>
          <td className='p-5'>{time.time.nome}</td>
          <td className='p-5'>{time.usuario.nome_responsavel}</td>
          <td className='p-5'>{time.modalidade.nome_modalidade}</td>
          <td className='p-5'>{time.informacoes.quantidade}</td>
          <td className='p-5'>{time.informacoes.jogadores.map(({status, id_time}) => status === "0" ? (
          <div key={id_time} className='flex gap-4'>
          <button className='p-2 h-7 w-7 md:w-10 md:h-10 text-xs md:text-base text-center btn-confirm' ><FontAwesomeIcon icon={faCheck} /></button>
          <button className='p-2 h-7 w-7 md:w-10 md:h-10 text-xs md:text-base text-center btn-delete' ><FontAwesomeIcon icon={faX} /></button>
          </div>
          ) : "Ver jogadores")}</td>
          </tr>)}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
