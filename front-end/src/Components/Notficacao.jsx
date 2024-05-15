import { faBell, faL } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import axiosInstance from '../helper/axios-instance'
import useNotification from './hooks/useNotification'

export const Notficacao = forwardRef(({ id }, ref) => {

    const { notificacao, hasNotificacao } = useNotification(id)
    const [mostrarNotficacao, setMostrarNotificacao] = useState(false)

    const dadosNotificacoes = [
        { mensagem: 'Você foi adicionado em um time.' },
        { mensagem: 'Próxima partida de futsal será hoje às 19:00.' },
        { mensagem: 'Seu time tem um jogo hoje às 20:00.' }
    ];
    
    const handleMostrarNotificacao = () => {
        setMostrarNotificacao(!mostrarNotficacao)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {

            console.log(e.target)

            if(ref.current && !ref.current.contains(e.target)){
                setMostrarNotificacao(false)
            }

            if(mostrarNotficacao){
                document.addEventListener("mousedown", handleClickOutside)
            }
            else {
                document.removeEventListener('mousedown', handleClickOutside)
            }

            return () =>{
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }
    }, [mostrarNotficacao, ref])

    return (
        <>
            <div ref={ref} onClick={handleMostrarNotificacao} className="text-white cursor-pointer flex items-center">
                <div  className='relative bottom-2 -right-5 bg-red-600 text-center w-4 h-4 text-xs rounded-full'>{dadosNotificacoes.length}</div>
                <FontAwesomeIcon className='text-base' icon={faBell} />
            </div>
            {mostrarNotficacao && (<div className={`absolute top-12 right-0 transition-opacity duration-500`}>
                <div className="w-full flex justify-center p-4">
                    <div className="user-dropdown divide-y divide-unifae-gray-2">
                        <p>Notificações</p>
                        <dd className="flex flex-col gap-2 text-sm divide-y divide-unifae-gray-2 max-w-44">
                            {dadosNotificacoes.map((dadoNaNotificao, index) => <dl key={index} className='text-pretty'>{dadoNaNotificao.mensagem}</dl>)}
                        </dd>
                <button onClick={()=> setMostrarNotificacao(false)} className="btn btn-green p-2 w-full">Ler todas as notificações</button>
                    </div>
                </div>

            </div>)}
        </>
    )
})

Notficacao.displayName = "Notificacao"