import React from 'react'
import { Modal } from '.'

export const ModalForm = ({ children, texto, onSubmit }) => {
    return (
        <form className="flex flex-col justify-center md:p-2" onSubmit={onSubmit}>
            <h1 className="text-center text-xl">{texto}</h1>
            {children}
            <Modal.Button type='submit' />
        </form>
    )
}