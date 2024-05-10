import { useEffect, useRef, useState } from "react"
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
    const generoRef = useRef(null)

    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [editModalidade, setEditModalidade] = useState(null)
    const [modalidades, setModalidades] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);

    useEffect(() => {
        if (user.tipo_usuario != 1) navigate('/jogos', { replace: true })
    }, [user, navigate])

    useEffect(() => {
        if (!modalidades) {
            axiosInstance.get("/modalidades")
                .then(response => {
                    setModalidades(response.data.data)
                    setLoading(false)
                })
                .catch(error => {
                    setErrors(error.message)
                    setLoading(false)
                })
        }
    }, [modalidades])


    const handleEditModal = (modalidade) => {
        setIsEditAlertOpen(true)
        setEditModalidade(modalidade)
    }

    const handleCloseEditModal = () => {
        setIsEditAlertOpen(false)
        setEditModalidade(null)
    }


    const handleSubmit = e => {
        e.preventDefault()

        console.log("teste")

        const payload = {
            nome: nomeRef.current.value,
            quantidade_participantes: quantidadeRef.current.value,
            genero: generoRef.current.value,
        }

        if (isEditAlertOpen) {
            axiosInstance.put(`/modalidades/${editModalidade.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Modalidade Editada com sucesso!")
                        setModalidades(m => m.map(modalidade => modalidade.id === editModalidade.id ? {...modalidade, ...data.data} : modalidade ))
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
                .finally(()=> setIsEditAlertOpen(false))
        }

        else {
            axiosInstance.post('/modalidades', payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Modalidade cadastrada com sucesso!")
                        setModalidades(m => [...m, data.data])
                    }
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
                .finally(()=> setIsAlertOpen(false))
        }
    }

    const handleDelete = (id) => {
        const confirm = window.confirm("Tem certeza de que deseja apagar?")

        if (confirm) {
            axiosInstance.delete(`/modalidades/${id}`)
                .then(() => {
                    alert("Modalidade excluida com sucesso")
                    setModalidades(m => m.filter(item => item.id !== id))
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
        }

        return
    }

    // if(errors) alert(errors)


    return (
        <>
            <Modal isOpen={isAlertOpen} onClose={handleClose} onSubmit={handleSubmit} texto="Cadastrar Modalidade" button={true} isForm={true}>

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

            <Modal isOpen={isEditAlertOpen} onClose={handleCloseEditModal} onSubmit={handleSubmit} texto={"Editar Modalidade"} button={true} isForm={true}>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome</label>
                    <input ref={nomeRef} type="text" className="input-modal" name="nome" defaultValue={editModalidade ? editModalidade.nome : ""} />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Quantidade de participantes</label>
                    <input ref={quantidadeRef} defaultValue={editModalidade ? editModalidade.quantidade_participantes : ""} type="text" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Gênero da modalidade</label>
                    <select ref={generoRef} className="input-modal bg-white" name="genero" id="genero">
                        <option selected={editModalidade ? editModalidade.genero : ""} value="">Selecione um gênero</option>
                        <option selected={editModalidade ? editModalidade.genero : ""} value="0">Masculino</option>
                        <option selected={editModalidade ? editModalidade.genero : ""} value="1">Feminino</option>
                    </select>
                </div>
            </Modal>

            <div className="w-full h-[88vh] flex items-center flex-col">
                <h1 className="text-center p-5 text-3xl font-medium">Modalidades</h1>
                <div className="flex flex-col">
                    <span className="flex justify-around p-5">
                        <button onClick={() => setIsAlertOpen(true)} className="w-fit p-3 btn-green text-sm ">Cadastrar Modalidade</button>
                        {/* <button onClick={() => setIsAlertOpen(true)} className="btn-sm btn-green text-sm ">Filtrar</button> */}
                    </span>
                    <input type="text" className="input-cadastro" placeholder="Insira algo para buscar" />
                </div>

                <div className="flex flex-col justify-center items-center p-5">
                    {loading ? (<div className="w-full h-full flex justify-center items-center"> <Oval visible={true} height="50" width="50" color="#3BBFA7" secondaryColor="#38A69B" /> </div>) :
                        (<table className="table-fixed bg-card-white-1 round w-[97%] flex-grow rounded-xl p-5 ">
                            <thead className="bg-unifae-green-4 rounded-xl text-white w-full">
                                <tr className="text-center">
                                    {/* <th className="p-5">ID</th> */}
                                    <th className="p-5">Nome</th>
                                    <th className="p-5">Participantes</th>
                                    <th className="p-5">Gênero</th>
                                    <th className="p-5">Data de adição</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                                {modalidades.map((response, index) => (

                                    <tr key={response.id} className="text-center">
                                        {/* <td className="p-5">{response.id}</td> */}
                                        <td className="p-5">{response.nome}</td>
                                        <td className="p-5">{response.quantidade_participantes}</td>
                                        <td className="p-5">{response.genero}</td>
                                        <td className="p-5">{response.data_adicao}</td>
                                        <td className="p-5 flex gap-5"><button onClick={() => handleEditModal(response)} className="btn-sm btn-edit">Editar</button> <button onClick={() => handleDelete(response.id)} className="btn-sm btn-delete">Excluir</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)}
                </div>
            </div>

        </>


    )
}