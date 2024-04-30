import { useEffect, useId, useRef, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"
import useAxios from "../../Components/hooks/useAxios"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import { Search } from "../../Components/Search bar/Search"

export const Times = () => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()
    const nomeRef = useRef(null)
    const modalidadeRef = useRef(null)

    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [editTimes, setEditTimes] = useState(null)
    const [times, setTimes] = useState(null);
    const [modalidades, setModalidades] = useState([])
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);

    useEffect(() => {
        if (user.tipo_usuario != 1) navigate('/jogos', { replace: true })
    }, [user, navigate])

    useEffect(() => {
        if (!times) {
            axiosInstance.get("/times")
                .then(({data}) => {
                    setTimes(data.times)
                    setModalidades(data.modalidades)
                    setLoading(false)
                })
                .catch(error => {
                    setErrors(error.message)
                    setLoading(false)
                })
        }
    }, [times])


    const handleEditModal = (time) => {
        setEditTimes(time)
        setIsEditAlertOpen(true)
    }

    const handleCloseEditModal = () => {
        setIsEditAlertOpen(false)
        setEditTimes(null)
    }

    const handleSelectUser = (id) =>{
       localStorage.setItem("responsavelId", id)
    }

    const getResponasavelId = () => {
        return localStorage.getItem("responsavelId")
    }

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            nome: nomeRef.current.value,
            id_modalidade: modalidadeRef.current.value,
            id_responsavel: getResponasavelId(),
            status: 0,
        }

        if (isEditAlertOpen) {
            axiosInstance.put(`/times/${editTimes.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Time Editado com sucesso!")
                        setTimes(m => m.map(modalidade => modalidade.id === editTimes.id ? {...modalidade, ...data.data} : modalidade ))
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
            axiosInstance.post('/times', payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Time cadastrado com sucesso!")
                        setTimes(m => [...m, data.data])
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
            axiosInstance.delete(`/times/${id}`)
                .then(() => {
                    alert("Time excluido com sucesso")
                    setTimes(m => m.filter(item => item.id !== id))
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

    return (
        <>
            {/* Modal de cadastro */}
            <Modal isOpen={isAlertOpen} onClose={handleClose} onSubmit={handleSubmit} texto="Cadastrar Time">

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome do time</label>
                    <input ref={nomeRef} type="text" className="input-modal" name="nome" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Modalidade</label>
                   <select ref={modalidadeRef} className="input-modal bg-white"  name="modalidade" id="modalidade">
                        <option value="">Selecione uma modalidade</option>
                        {modalidades != null && modalidades.map(modalidade => (
                            <option key={modalidade.id} value={modalidade.id}>
                                {modalidade.nome}
                            </option>
                        ))}
                   </select>
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Responsável pelo time</label>
                    <Search placeholder={"Digite para pesquisar"} url={"/responsaveis"} handleSelectUser={handleSelectUser}/>
                </div>
            </Modal>

            {/* Modal de edição */}
            <Modal isOpen={isEditAlertOpen} onClose={handleCloseEditModal} onSubmit={handleSubmit} texto="Cadastrar Time">

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome do time</label>
                    <input ref={nomeRef} defaultValue={editTimes ? editTimes.nome : ""} type="text" className="input-modal" name="nome" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Modalidade</label>
                   <select ref={modalidadeRef} className="input-modal bg-white"  name="modalidade" id="modalidade">
                        <option value="">Selecione uma modalidade</option>
                        {modalidades != null && modalidades.map(modalidade => (
                            <option selected={editTimes ? editTimes.modalidade.nome_modalidade : ""} key={modalidade.id} value={modalidade.id}>
                                {modalidade.nome}
                            </option>
                        ))}
                   </select>
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Responsável pelo time</label>
                    <Search placeholder={"Digite para pesquisar"} url={"/responsaveis"} handleSelectUser={handleSelectUser} data={editTimes ? editTimes.usuario.nome_responsavel : ""}/>
                </div>
            </Modal>

            <div className="w-full h-[88vh] flex items-center flex-col">
                <h1 className="text-center p-5 text-3xl font-medium">Times</h1>
                <div className="flex flex-col">
                    <span className="flex justify-around p-5">
                        <button onClick={() => setIsAlertOpen(true)} className="w-fit p-3 btn-green text-sm ">Cadastrar Time</button>
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
                                    <th className="p-5">Responsável</th>
                                    <th className="p-5">Modalidade</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                                {times.map(response => (

                                    <tr key={response.id} className="text-center">
                                        {/* <td className="p-5">{response.id}</td> */}
                                        <td className="p-5">{response.nome}</td>
                                        <td className="p-5">{response.usuario.nome_responsavel}</td>
                                        <td className="p-5">{response.modalidade.nome_modalidade}</td>
                                        <td className="p-5">{response.status}</td>
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