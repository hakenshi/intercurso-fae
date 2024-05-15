import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import p from "prop-types"
import { useEffect, useRef, useState } from "react"

export const Modal = ({ children, isOpen, onClose, onSubmit, texto, isForm, button}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
        onClose()
    }

    if (isOpen)
        return (
            <dialog className="flex items-center justify-center min-w-full min-h-full bg-unifae-gray50-1 z-10 absolute left-0 top-0">

                <div className="bg-unifae-white-1 w-full h-screen md:w-fit md:h-fit md:p-5 md:rounded-xl z-20">
                    <span className="flex justify-end text-unifae-gray-2"><button onClick={closeModal} className="flex items-center justify-center p-2 h-[30px] w-[30px] rounded-full hover:text-unifae-white-1 hover:bg-unifae-gray50-3">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    </span>

                    {/* 
                    
                     Se por alguma razão ou circunstância eu não quiser que o modal seja um formulário ou que ele não precise ser um formulário, é só passar por prop isForm = false. 

                    */}

                    {isForm ? <form className="flex flex-col justify-center md:p-2" onSubmit={onSubmit}>
                        <h1 className="text-center text-xl">{texto}</h1>
                        {children}

                        {button && <div className="flex justify-center gap-10 p-2">
                            <button type="submit" className="btn-sm btn-green">Enviar</button>
                        </div>}
                    </form> : 
                    <div className="flex flex-col justify-center p-2" onSubmit={() => onSubmit()} >
                        <h1 className="text-center text-xl">{texto}</h1>
                        {children}
                        {button && <div className="flex justify-center gap-10 p-2">
                            <button onClick={()=>onSubmit()} type="button" className="btn-sm btn-green">Enviar</button>
                        </div>}
                    </div>}
                </div>
            </dialog>
        )
}


Modal.propTypes = {
    children: p.node,
    isOpen: p.bool,
    onClose: p.func,
    onSubmit: p.func,
    texto: p.string,
    isForm: p.bool,
}
