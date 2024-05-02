import { useEffect, useId, useRef, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"
import useAxios from "../../Components/hooks/useAxios"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import { Search } from "../../Components/Search bar/Search"

export const Times = ({ id }) => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()
    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [isJogadoresAlertOpen, setisJogadoresAlertOpen] = useState(false);
    const nomeRef = useRef(null)
    const modalidadeRef = useRef(null)

    const [editTimes, setEditTimes] = useState(null)
    const [times, setTimes] = useState(null);
    const [modalidades, setModalidades] = useState([])
    const [jogadores, setJogadores] = useState([])
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);

    useEffect(() => {
        if (user.tipo_usuario != 1 && user.tipo_usuario != 2) navigate('/jogos', { replace: true })
    }, [user, navigate])

    useEffect(() => {
        if (!times) {
            axiosInstance.get("/times")
                .then(({ data }) => {
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

    const handleJogadoresModal = (jogadores) => {
        setJogadores(jogadores)
        setisJogadoresAlertOpen(true)
    }
    const handleCloseJogadores = () => {
        setisJogadoresAlertOpen(false)
        setJogadores(null)
    }

    const handleSelectResponsavel = (id) => {
        localStorage.setItem("responsavelId", id)
    }

    const handleSelectJogador = () => [

    ]

    const getResponasavelId = () => {
        return localStorage.getItem("responsavelId")
    }

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            nome: nomeRef.current.value,
            id_modalidade: modalidadeRef.current.value,
            id_responsavel: user.tipo_usuario == 2 ? id : getResponasavelId(),
            status: 0,
        }

        if (isEditAlertOpen) {
            axiosInstance.put(`/times/${editTimes.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Time Editado com sucesso!")
                        setTimes(t => t.map(time => time.id === editTimes.id ? { ...time, ...data.data } : time))
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
                .finally(() => setIsEditAlertOpen(false))
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
                .finally(() => setIsAlertOpen(false))
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
    const handleInativar = (data) => {

        const status = data.status === "Ativo" ? "1" : "0"

        const confirm = window.confirm(`Tem certeza de que deseja ${data.status === 'Ativo' ? "inativar" : "ativar"} esse time?`)

        if (confirm) {
            axiosInstance.put(`/times/${data.id}`, {
                status: status
            })
                .then(() => {
                    alert(`Time ${data.status === 'Ativo' ? "inativado" : "ativado"} com sucesso`)
                    location.reload()
                    navigate("/meus-times")
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
                    <select ref={modalidadeRef} className="input-modal bg-white" name="modalidade" id="modalidade">
                        <option value="">Selecione uma modalidade</option>
                        {modalidades != null && modalidades.map(modalidade => (
                            <option key={modalidade.id} value={modalidade.id}>
                                {modalidade.nome}
                            </option>
                        ))}
                    </select>
                </div>
                {user.tipo_usuario == 1 && <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Responsável pelo time</label>
                    <Search placeholder={"Digite para pesquisar"} url={"/responsaveis"} handleSelectUser={handleSelectResponsavel} data={editTimes ? editTimes.usuario.nome_responsavel : ""} />
                </div>}
            </Modal>

            {/* Modal de edição */}
            <Modal isOpen={isEditAlertOpen} onClose={handleCloseEditModal} onSubmit={handleSubmit} texto="Editar Time" id={editTimes ? editTimes.id : ""} handleDelete={() => handleDelete(editTimes ? editTimes.id : "")}>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome do time</label>
                    <input ref={nomeRef} defaultValue={editTimes ? editTimes.nome : ""} type="text" className="input-modal" name="nome" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Modalidade</label>
                    <select ref={modalidadeRef} className="input-modal bg-white" name="modalidade" id="modalidade">
                        <option value="">Selecione uma modalidade</option>
                        {modalidades != null && modalidades.map(modalidade => (
                            <option selected={editTimes ? editTimes.modalidade.nome_modalidade : ""} key={modalidade.id} value={modalidade.id}>
                                {modalidade.nome}
                            </option>
                        ))}
                    </select>
                </div>
                {user.tipo_usuario == 1 && <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Responsável pelo time</label>
                    <Search placeholder={"Digite para pesquisar"} url={"/responsaveis"} handleSelectUser={handleSelectResponsavel} data={editTimes ? editTimes.usuario.nome_responsavel : ""} />
                </div>}
            </Modal>

            {/* Modal de jogadores */}
            <Modal isOpen={isJogadoresAlertOpen} onClose={handleCloseJogadores} texto={'Editar Jogadores'}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                RA
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {jogadores && jogadores.map(jogador => (
                            <tr key={jogador.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {jogador.nome}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {jogador.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {jogador.ra}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {jogador.status === 1 ? "Inativo" : "Ativo"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
                                    <th className="p-5">Quantidade de jogadores</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5"></th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                                {times
                                    .filter(response => id ? response.usuario.id_responsavel == id : true)
                                    .map(response => (

                                        <tr key={response.id} className="text-center">
                                            {/* <td className="p-5">{response.id}</td> */}
                                            <td className="p-5">{response.nome}</td>
                                            <td className="p-5">{response.usuario.nome_responsavel}</td>
                                            <td className="p-5">{response.modalidade.nome_modalidade}</td>
                                            <td className="p-5">{response.informacoes.quantidade}</td>
                                            <td className="p-5">{response.status}</td>
                                            <td className="p-5">
                                                <button onClick={() => handleJogadoresModal(response.informacoes.jogadores)} className="bg-unifae-gray-3 text-white p-2 rounded-lg ">Ver jogadores</button>

                                            </td>
                                            <td className="p-5 flex gap-5">
                                                <button onClick={() => handleEditModal(response)} className="btn-sm btn-edit">Editar</button>
                                                <button onClick={() => handleInativar(response)} className={`btn-sm ${response.status === 'Ativo' ? 'btn-delete' : 'btn-confirm'}`}>{`${response.status === 'Ativo' ? 'Inativar' : 'Ativar'}`}</button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>)}
                </div>
            </div>

        </>


    )
}