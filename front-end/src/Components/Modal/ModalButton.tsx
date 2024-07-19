import React from 'react'

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
    texto: string
}

export const ModalButton = ({type, texto = "Enviar", ...rest}: ModalButtonProps) => {
    return (
        <div className="flex justify-center gap-10 p-2">
            <button type={type} {...rest} className="btn-sm btn-green">{texto}</button>
        </div>
    )
}
