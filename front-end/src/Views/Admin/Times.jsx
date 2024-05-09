import { useEffect, useId, useRef, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { Navigate, useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"
import useAxios from "../../Components/hooks/useAxios"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import { Search } from "../../Components/Search bar/Search"
import p from "prop-types"
import { faL } from "@fortawesome/free-solid-svg-icons"

export const Times = (props) => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()
    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [isJogadoresAlertOpen, setisJogadoresAlertOpen] = useState(false);
    const nomeRef = useRef(null)
    const modalidadeRef = useRef(null)

    const [times, setTimes] = useState(null);
    const [timeId, setTimeId] = useState(null);
    const [idModalidade, setIdModalidade] = useState(null);
    const [editTimes, setEditTimes] = useState(null)
    const [modalidades, setModalidades] = useState([])
    const [jogadores, setJogadores] = useState([])
    const [editJogadores, setEditJogadores] = useState([])
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);
    const [novoJogador, setNovoJogador] = useState([])
    useEffect(() => {
        if (user.tipo_usuario != 1 && user.tipo_usuario != 2) navigate('/jogos', { replace: true })
    }, [user, navigate])

    useEffect(() => {
        if (!times) {
            axiosInstance.get("/times")
                .then(({ data }) => {
                    setTimes(data.times)
                    setModalidades(data.modalidades)
                    setJogadores(data.jogadores)
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

    const handleJogadoresModal = (jogadores, id, idModalidade) => {

        console.log(jogadores)

        setEditJogadores(jogadores)
        setTimeId(id)
        setIdModalidade(idModalidade)
        setisJogadoresAlertOpen(true)
    }

    const handleCloseJogadores = () => {
        setisJogadoresAlertOpen(false)
        setEditJogadores(null)
    }

    const handleSelectResponsavel = (id) => {
        localStorage.setItem("responsavelId", id)
    }

    const handleSelectJogador = (jogador) => {
        setNovoJogador(jogador)
    }
    const handleAddJogador = () => {

        const aluno = jogadores.find(jogador => jogador.id === novoJogador)

        const jogadorExistente = editJogadores.some(jogador => jogador.id_usuario === novoJogador)

        const { quantidade_participantes, nome } = modalidades.find(modalidade => modalidade.id === idModalidade)

        if (editJogadores.length >= quantidade_participantes) {
            alert(`Quantidade máxima de jogadores na modalidade ${nome} é de ${quantidade_participantes}. O time está cheio.`)
            return
        }

        else if (novoJogador == null || !novoJogador || novoJogador == '') {
            alert("Por favor, escolha um aluno")
            return
        }

        else if (jogadorExistente) {
            alert("Esse aluno já está no time.")
            return
        }

        else {
            setNovoJogador(null)
            setEditJogadores([...editJogadores, { ...aluno, id_usuario: aluno.id, id_time: timeId, status: '1' }])
        }

    }

    const getResponasavelId = () => {
        return localStorage.getItem("responsavelId")
    }

    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            nome: nomeRef.current.value,
            id_modalidade: modalidadeRef.current.value,
            id_responsavel: user.tipo_usuario == 2 ? props.id : getResponasavelId(),
            status: 1,
        }

        if (isEditAlertOpen) {
            axiosInstance.put(`/times/${editTimes.time.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Time Editado com sucesso!")
                        setTimes(t => t.map(time => time.time.id === editTimes.time.id ? { ...time, ...data.data } : time))
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response)
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

    const handleDeleteJogador = (id) => {
        const confirm = window.confirm("Tem certeza de que deseja este jogador do time?")



        if (confirm) {
            axiosInstance.patch(`/expulsar-jogador/${id}`)
                .then(() => {
                    alert("Jogador excluido com sucesso")
                    setEditJogadores(j => j.filter(item => item.id !== id))
                    setTimes(t => t.map(time => time.informacoes.jogadores.some(jogador=> jogador.id === id) ? ({
                        ...time,
                        informacoes: {
                            ...time.informacoes,
                            jogadores: time.informacoes.jogadores.filter(jogador => jogador.id !== id),
                            quantidade: time.informacoes.quantidade - 1,
                        }
                    }) : time))
                })
                0
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
        }

        return
    }

    const handleInativar = (times) => {


        const status = times.time.status === "1" ? "0" : "1"
        const confirm = window.confirm(`Tem certeza de que deseja ${times.time.status === '1' ? "inativar" : "ativar"} esse time?`)

        if (confirm) {
            axiosInstance.put(`/times/${times.time.id}`, {
                status: status
            })
                .then(({ data }) => {

                    alert(`Time ${times.time.status === '1' ? "inativado" : "ativado"} com sucesso`)
                    setTimes(t => t.map(time => time.time.id === times.time.id ? { ...time, ...data.data } : time))

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

    const handleInativarJogador = (jogador) => {

        const status = jogador.status === "1" ? "0" : "1"

        const confirm = window.confirm(`Tem certeza de que deseja ${jogador.status === '1' ? "inativar" : "ativar"} esse jogador?`)

        if (confirm) {
            axiosInstance.put(`/jogadores/${jogador.id}`, {
                status: status
            })
                .then(() => {
                    alert(`Jogador ${jogador.status === '1' ? "inativado" : "ativado"} com sucesso`)
                    setEditJogadores(j => j.map(j => j.id === jogador.id ? { ...j, status: status } : j))
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

    const handleJogadoresSubmit = e => {
        e.preventDefault()

        const payload = editJogadores.map(jogador => ({
            id_usuario: jogador.id_usuario,
            id_time: jogador.id_time,
            status: jogador.status
        }))
        
        axiosInstance.post('/jogadores', payload)
        .then(({ data }) => {
                alert(`${data.data.length === 1 ? 'Jogador inserido com sucesso no time' : "Jogadores inseridos com sucesso no time"}`)

                setTimes(t => t.map(time => time.time.id === data.data[0].time.id_time ? { 
                    ...time,
                    informacoes: {
                        jogadores: [
                            ...time.informacoes.jogadores,
                            ...data.data.map(jogador => ({
                                id: jogador.id,
                                id_usuario: jogador.usuario.id_usuario,
                                id_time: jogador.time.id_time,
                                nome: jogador.usuario.nome_usuario,
                                email: jogador.usuario.email_usuario,
                                ra: jogador.usuario.ra_usuario,
                                status: jogador.status,
                            }))
                        ],
                        quantidade: time.informacoes.quantidade + data.data.length,
                    }
                } : time));
                
                // setTimes(t => t.map(time => time.time.id === editTimes.time.id ? { ...time, ...data.data } : time))

                
                setisJogadoresAlertOpen(false)
            })
            .catch(error => {
                const response = error.message
                if (response) alert(response)
            })
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
            <Modal isOpen={isEditAlertOpen} onClose={handleCloseEditModal} onSubmit={handleSubmit} texto="Editar Time" id={editTimes ? editTimes.id : ""}>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome do time</label>
                    <input ref={nomeRef} defaultValue={editTimes ? editTimes.time.nome : ""} type="text" className="input-modal" name="nome" />
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
            <Modal isOpen={isJogadoresAlertOpen} onClose={handleCloseJogadores} texto={'Jogadores'} onSubmit={handleJogadoresSubmit}>
                <div className="py-5">
                    <div className="flex justify-center items-center p-2 gap-3 w-full">
                        <Search placeholder={"Insira o RA de um aluno"} url={"/search-jogadores"} handleSelectUser={handleSelectJogador} />
                        <button type="button" onClick={handleAddJogador} className="btn-green p-2">Adicionar jogador</button>
                    </div>

                    <table className="w-full table-auto divide-y divide-gray-200">
                        <thead className="bg-unifae-green-4">
                            <tr className="text-center">
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Nome
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    RA
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {editJogadores && editJogadores.map((jogador, index) => (
                                <tr key={index}>
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
                                        {jogador.status === "1" ? "Ativo" : "Inativo"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex gap-6">
                                        <button type="button" onClick={() => handleInativarJogador(jogador)} className={`btn-sm ${jogador.status === "1" ? 'btn-delete' : 'btn-confirm'}`}>{jogador.status === "1" ? "Inativar" : "Ativar"}</button>
                                        <button type="button" onClick={() => handleDeleteJogador(jogador.id)} className={`btn-sm btn-delete`}>Retirar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                    <th className="p-5">Quantidade de jogadores</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5"></th>
                                    <th className="p-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                                {times
                                    .filter(response => props.id ? response.usuario.id_responsavel == props.id : true)
                                    .map(response => (
                                        <tr key={response.time.id} className="text-center">
                                            <td className="p-5">{response.time.nome}</td>
                                            <td className="p-5">{response.usuario.nome_responsavel}</td>
                                            <td className="p-5">{response.modalidade.nome_modalidade}</td>
                                            <td className="p-5">{response.informacoes.quantidade}</td>
                                            <td className="p-5">{response.time.status === "0" ? "Inativo" : "Ativo"}</td>
                                            <td className="p-5">
                                                <button onClick={() => handleJogadoresModal(response.informacoes.jogadores, response.time.id, response.modalidade.id_modalidade)} className="bg-unifae-gray-3 text-white p-2 rounded-lg ">Ver jogadores</button>

                                            </td>
                                            <td className="p-5 flex gap-5">
                                                <button onClick={() => handleEditModal(response)} className="btn-sm btn-edit">Editar</button>
                                                <button onClick={() => handleInativar(response)} className={`btn-sm ${response.time.status === "0" ? 'btn-confirm' : 'btn-delete'}`}>{`${response.time.status === "0" ? 'Ativar' : 'Inativar'}`}</button>
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

Times.propTypes = {
    id: p.number
}