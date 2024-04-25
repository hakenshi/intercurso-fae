import { useEffect, useRef } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"
import useAxios from "../../Components/hooks/useAxios"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"

export const Modalidades = () => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()

    const nomeRef = useRef(null)
    const quantidadeRef = useRef(null)
    const generoRef = useRef(null )
    let reloadPage = false
    
    useEffect(() => {
        if (user.tipo_usuario != 1) navigate('/jogos', { replace: true })
    }, [user, navigate])


    const [modalidades, loading, errors] = useAxios({
        axiosInstance: axiosInstance,
        method: "get",
        url: "/modalidades"
    })

    const handleSubmit = e =>{
        e.preventDefault()

        console.log("teste")

        const payload = {
            nome: nomeRef.current.value,
            quantidade_participantes: quantidadeRef.current.value,
            genero: generoRef.current.value,
        }
        
        axiosInstance.post('/modalidades', payload)
        .then(({data})=> {
            if(data) {
                alert("Modalidade cadastrada com sucesso!")
                
            }
            
        })
        .catch(error => {
            const response = error.response
            if(response){ 
                alert(response.data.msg)
            }
            reloadPage = false
        })
        .finally(()=> {
           if(reloadPage){
            setIsAlertOpen(false)
            location.reload()
           }
        })
    }

    if(errors) alert(errors)

  
    return (
        <>
            <Modal isOpen={isAlertOpen} onClose={handleClose} onSubmit={handleSubmit}>
                <h1 className="text-center text-xl">Cadastrar Modalidade</h1>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome</label>
                    <input ref={nomeRef} type="text" className="input-modal" name="nome" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Quantidade de participantes</label>
                    <input ref={quantidadeRef} type="text" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Gênero da modalidade</label>
                    <select ref={generoRef} className="input-modal bg-white" name="genero" id="genero">
                        <option value="">Selecione um gênero</option>
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                    </select>
                    </div>
            </Modal>

            <div className="w-full h-[88vh] flex justify-stretch items-center flex-col">
                    <h1 className="text-center p-5 text-3xl font-medium">Modalidades</h1>
                <div className="flex flex-col">
                    <span className="flex justify-around p-5">
                        <button onClick={() => setIsAlertOpen(true)} className="btn-sm btn-green text-sm ">Cadastrar Modalidade</button>
                        {/* <button onClick={() => setIsAlertOpen(true)} className="btn-sm btn-green text-sm ">Filtrar</button> */}
                    </span>
                    <input type="text" className="input-cadastro" placeholder="Insira algo para buscar"/>
                </div>
                
                    <div className="flex flex-col justify-center p-5">
                        { loading ? (<div className="w-full h-full flex justify-center items-center"> <Oval visible={true} height="50" width="50" color="#3BBFA7" secondaryColor="#38A69B"/> </div>) : 
                        (<table className="table-fixed bg-card-white-1 round w-[97%] flex-grow rounded-xl p-5 ">
                            <thead className="bg-unifae-green-4 rounded-xl text-white w-full">
                                <tr className="text-center">
                                    <th className="p-5">ID</th>
                                    <th className="p-5">Nome</th>
                                    <th className="p-5">Participantes</th>
                                    <th className="p-5">Gênero</th>
                                    <th className="p-5">Data de adição</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                            {modalidades.data.data.map((response, index) =>(

                            <tr key={response.id} className="text-center">
                                <td className="p-5">{response.id}</td>
                                <td className="p-5">{response.nome}</td>
                                <td className="p-5">{response.quantidade_participantes}</td>
                                <td className="p-5">{response.genero}</td>
                                <td className="p-5">{response.data_adicao}</td>
                                <td className="p-5 flex gap-5"><button data-edit-id={response.id} className="btn-sm btn-edit">Editar</button> <button data-delete-id={response.id} className="btn-sm btn-delete">Excluir</button></td>
                            </tr>
                            ))}
                            </tbody>
                        </table>)}
                    </div>
            </div>

        </>


    )
}