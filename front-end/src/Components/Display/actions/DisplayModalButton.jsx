import React from 'react'
import GerarJogos from "../../GerarJogos/index.jsx";

export const DisplayModalButton = ({ setIsModalOpen, text }) => {
    return (
        <span className="flex justify-around p-5">
            <GerarJogos />
            <button onClick={setIsModalOpen} className="w-fit p-3 btn-green text-sm ">
                {text}
            </button>
        </span>
    )
}
