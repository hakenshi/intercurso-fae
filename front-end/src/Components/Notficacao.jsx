import { faBell, faBellSlash, faL } from '@fortawesome/free-solid-svg-icons'
import { faBell as faBellRegular }  from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import axiosInstance from '../helper/axios-instance'
import useNotification from './hooks/useNotification'
import { useAlert } from './hooks/useAlert'
import { AlertConfirm } from './Alerts/AlertConfirm'
import { useClickOutSide } from './hooks/useClickOutside'

export const Notficacao = ({ id }) => {

    const { notificacao, readNotification } = useNotification(id)
    const {isAlertOpen, setIsAlertOpen, handleClose} = useAlert()
    const [mostrarNotficacao, setMostrarNotificacao] = useState(false)
    const notificaoRef = useClickOutSide(()=> setMostrarNotificacao(false))

    const handleDeleteNotificacao = () =>{
        if(notificacao.length > 0){
        readNotification(notificacao)
        setIsAlertOpen(false)
        setMostrarNotificacao(false)
        }
    }
    
    const handleMostrarNotificacao = () => {
        setMostrarNotificacao(!mostrarNotficacao)
    }
    return (
        <>
            <AlertConfirm onConfirm={handleDeleteNotificacao} isOpen={isAlertOpen} text={"Tem certeza de que deseja apagar suas notificações?"} onClose={handleClose}/>
            <div ref={notificaoRef}>
            <div onClick={handleMostrarNotificacao} className="text-white cursor-pointer flex items-center">
                {notificacao.length > 0 && <div className='relative bottom-2 -right-5 bg-red-600 text-center w-4 h-4 text-xs rounded-full'>{notificacao.length}</div>}
                <FontAwesomeIcon className='text-base' icon={notificacao.length > 0 ? faBell : faBellRegular} />
            </div>
                    <div className={`absolute top-12 right-0 overflow-hidden transition-all duration-[400ms] ${mostrarNotficacao ? "max-h-96 ease-in" : "max-h-0 ease-out"}`}>
                        <div className="w-full flex justify-center p-4">
                            <div className="user-dropdown">
                                <p className="text-center">Notificações</p>
                                <div className="flex flex-col text-sm max-w-full w-44 overflow-y-scroll max-h-60 space-y-4">
                                    {notificacao.map(notificacao => (
                                        <div key={notificacao.id} className='text-pretty hover:bg-unifae-gray50-2 p-2 rounded'>
                                            {notificacao.notificacao}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setIsAlertOpen(true)} className="btn btn-green p-2 w-full">Apagar notificações</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
Notficacao.displayName = "Notificacao"