import React from 'react'

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
}

export const ModalButton = ({type, ...rest}: ModalButtonProps) => {
    return (
        <div className="flex justify-center gap-10 p-2">
            <button type={type} {...rest} className="btn-sm btn-green">Enviar</button>
        </div>
    )
}
