import React from 'react'

export const DisplayModalButton = ({ setIsModalOpen, text }) => {
    return (
        <span className="flex justify-around p-5">
            <button onClick={setIsModalOpen} className="w-fit p-3 btn-green text-sm ">
                {text}
            </button>
        </span>
    )
}
