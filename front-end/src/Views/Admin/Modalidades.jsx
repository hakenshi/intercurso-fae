import { useEffect } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"

export const Modalidades = () => {


    const { user } = useStateContext()
    const navigate = useNavigate()

    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()

    useEffect(() => {
        if (user.tipo_usuario != 1) navigate('/jogos', { replace: true })
    }, [user, navigate])

    return (
        <>

            <Modal isOpen={isAlertOpen} onClose={handleClose}>
                <h1 className="text-center text-xl">Cadastrar Modalidade</h1>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="input-modal" name="nome" />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Quantidade de participantes</label>
                        <input type="text" className="input-modal" name="quantidade-pariticpantes" />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Gênero da modalidade</label>
                        <input type="text" className="input-modal" name="gênero" />
                    </div>
            </Modal>

            <div className="flex justify-center p-5"><button onClick={()=> setIsAlertOpen(true)} className="btn-sm btn-green">Cadastrar Modalidade</button></div>

            <table>

            </table>

        </>


    )
}