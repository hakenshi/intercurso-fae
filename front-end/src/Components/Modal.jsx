import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import p from "prop-types"
import { useEffect, useRef, useState } from "react"

export const Modal = ({ children, isOpen, onClose, onSubmit}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    // const modalRef = useRef(null)

    const closeModal = () => {
        setIsModalOpen(false)
        onClose()
    }

    if (isOpen)
        return (
            <div className="flex items-center justify-center min-w-full min-h-full bg-unifae-gray50-1 z-10 absolute left-0 top-0">

                <div className="bg-unifae-white-1 w-1/3 h-fit p-5 rounded-xl z-20">
                    <span className="flex justify-end text-unifae-gray-2"><button onClick={closeModal} className="flex items-center justify-center p-2 h-[30px] w-[30px] rounded-full hover:text-unifae-white-1 hover:bg-unifae-gray50-3">
                        <FontAwesomeIcon icon={faClose} />
                    </button></span>
                    <form className="flex flex-col justify-center p-2" onSubmit={onSubmit} >
                        {children}
                  
                    <div className="flex justify-center p-2">
                        <button type="submit" className="btn-sm btn-green">Cadastrar</button>
                    </div>
                    </form>
                </div>
            </div>
        )
}


Modal.propTypes = {
    children: p.node,
    isOpen: p.bool,
    onClose: p.func,
    onSubmit: p.func,
}
