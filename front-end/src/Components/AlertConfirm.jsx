import { faClose, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const AlertConfirm = () =>{
    return(
        <div className=" h-[600px] flex justify-center items-center">
            <div className="bg-[#EAEAEA] min-w-[400px] p-5 shadow-md rounded-xl">
                <span className="w-full flex justify-end text-unifae-gray-2"><button className="flex items-center justify-center p-2 h-[30px] w-[30px] rounded-full hover:text-unifae-white-1 hover:bg-unifae-gray50-3">
                    <FontAwesomeIcon icon={faClose}/>
                </button></span>
                <span className="h-[200px] flex flex-col gap-5 justify-center items-center p-3 text-unifae-gray-2">
                <FontAwesomeIcon fontSize="48" className="w-12 h-12 rounded-full p-2" color="#E7C825" icon={faWarning}/>
                <p className="text-black font-semibold">Tem certeza de que deseja editar?</p>
                </span>
                <span className="flex justify-evenly">
                <button className="btn-sm btn-green">Confimar</button>
                <button className="btn-sm btn-gray">Cancelar</button>
                </span>
            </div>
        </div>
    )
}