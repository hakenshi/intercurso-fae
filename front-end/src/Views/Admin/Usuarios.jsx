import { useEffect, useRef, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { Modal } from "../../Components/Modal"
import { useAlert } from "../../Components/hooks/useAlert"
import useAxios from "../../Components/hooks/useAxios"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import cursos from "../../../public/cursos.json"

export const Usuarios = () => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()
    const nomeRef = useRef(null);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const raRef = useRef(null);
    const cursoRef = useRef(null);
    const confirmSenhaRef = useRef(null);
    const telefoneRef = useRef(null);
    const tipoUsuarioRef = useRef(null)

    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [editUsuario, setEditUsuario] = useState(null)
    const [usuarios, setUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);


    useEffect(() => {
        if (user.tipo_usuario != 1) navigate('/jogos', { replace: true })
    }, [user, navigate])

    useEffect(() => {
        if (!usuarios) {
            axiosInstance.get("/usuarios")
                .then(response => {
                    setUsuarios(response.data.data)
                    setLoading(false)
                })
                .catch(error => {
                    setErrors(error.message)
                    setLoading(false)
                })
        }
    }, [usuarios])


    const handleEditModal = (usuario) => {
        setIsEditAlertOpen(true)
        setEditUsuario(usuario)
    }

    const handleCloseEditModal = () => {
        setIsEditAlertOpen(false)
        setEditUsuario(null)
    }

    if (erros) alert(erros)

    const handleSubmit = e => {
        e.preventDefault()

        if (senhaRef.current.value != confirmSenhaRef.current.value) {
            alert("As senhas não coincidem")
            return
        }

        const payload = {
            id_curso: cursoRef.current.value,
            nome: nomeRef.current.value,
            email: emailRef.current.value,
            senha: senhaRef.current.value,
            telefone: telefoneRef.current.value,
            ra: raRef.current.value,
            tipo_usuario: tipoUsuarioRef.current.value ? tipoUsuarioRef.current.value : 3,
        }

        if (isEditAlertOpen) {
            axiosInstance.patch(`/usuarios/${editUsuario.usuario.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Usuário Editado com sucesso!")
                        setUsuarios(u => u.map(usuario => usuario.usuario.id === editUsuario.usuario.id ? { ...usuario, ...data.data } : usuario))
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
            axiosInstance.post('/usuarios', payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Usuário cadastrado com sucesso!")
                        setUsuarios(u => [...u, data.data])
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
            axiosInstance.delete(`/usuarios/${id}`)
                .then(() => {
                    alert("Usuário excluido com sucesso")
                    setUsuarios((u) => u.filter(({ usuario }) => usuario.id !== id))
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
    const handleTornarResponsavel = (data) => {

        if (data.usuario.tipo_usuario === "Responsável") {
            alert('Esse usuário já é um responsável.')
            return
        }
        
            const confirm = window.confirm("Tem certeza de que deseja tornar esse usuário responsável?")

            const payload = {
                id_curso: data.curso.id_curso,
                nome: data.usuario.nome,
                email: data.usuario.email,
                ra: data.usuario.ra,
                tipo_usuario: 2
            }

            if (confirm) {
                axiosInstance.patch(`/usuarios/${data.usuario.id}`, payload)
                    .then(() => {
                        alert("Esse usuário agora é responsável.")
                        setUsuarios(u => u.map(u => u.usuario.id === data.usuario.id ? { ...u, tipo_usuario: 2 } : u))
                    })
                    .catch(error => {
                        const response = error.response
                        if (response) {
                            alert(response.data.msg)
                        }
                    })
            }
    }

    return (
        <>
            <Modal isOpen={isAlertOpen} onClose={handleClose} onSubmit={handleSubmit} texto="Cadastrar Responsável">

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome</label>
                    <input ref={nomeRef} type="text" className="input-modal" name="nome" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="text" className="input-modal" name="email" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="senha">Senha</label>
                    <input ref={senhaRef} type="password" className="input-modal" name="senha" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="confirmar-senha">Confirmar Senha</label>
                    <input ref={confirmSenhaRef} type="password" className="input-modal" name="confirmar-senha" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="telefone">Telefone</label>
                    <input ref={telefoneRef} type="text" className="input-modal" name="telefone" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="ra">RA</label>
                    <input ref={raRef} type="text" className="input-modal" name="ra" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="curso">Curso</label>
                    <select className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                        {cursos.map(curso => <option ref={cursoRef} key={curso.id} value={curso.value}>{curso.curso}</option>)}
                    </select>
                </div>

            </Modal>

            <Modal isOpen={isEditAlertOpen} onClose={handleCloseEditModal} onSubmit={handleSubmit} texto="Cadastrar Responsável">

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="nome">Nome</label>
                    <input ref={nomeRef} defaultValue={editUsuario ? editUsuario.usuario.nome : ""} type="text" className="input-modal" name="nome" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Email</label>
                    <input ref={emailRef} defaultValue={editUsuario ? editUsuario.usuario.email : ""} type="text" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Senha</label>
                    <input ref={senhaRef} type="password" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Confirmar Senha</label>
                    <input ref={confirmSenhaRef} type="password" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Telefone</label>
                    <input ref={telefoneRef} defaultValue={editUsuario ? editUsuario.usuario.telefone : ""} type="text" className="input-modal" name="quantidade-pariticpantes" />
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">RA</label>
                    <input ref={raRef} defaultValue={editUsuario ? editUsuario.usuario.ra : ""} type="text" className="input-modal" name="quantidade-pariticpantes" />
                </div>

                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Curso</label>
                    <select ref={cursoRef} className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                        {cursos.map(curso => <option selected={editUsuario ? editUsuario.curso.nome_curso == curso.curso : ""} key={curso.id} value={curso.value}>{curso.curso}</option>)}
                    </select>
                </div>
                <div className="flex flex-col justify-center p-2">
                    <label htmlFor="quantidade-pariticpantes">Tipo de usuário</label>
                    <select ref={tipoUsuarioRef} defaultValue={editUsuario ? editUsuario.usuario.tipo_usuario : ""} className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                        <option value="">Escolha um tipo de usuário</option>
                        <option value="3">Usuário</option>
                        <option value="2">Responsável</option>
                        <option value="1">Admin</option>
                    </select>
                </div>

            </Modal>

            <div className="w-full h-[88vh] flex items-center flex-col">
                <h1 className="text-center p-5 text-3xl font-medium">Usuários</h1>
                <div className="flex flex-col">
                    <span className="flex justify-around p-5">
                        <button onClick={() => setIsAlertOpen(true)} className="w-fit p-3 btn-green text-sm ">Cadastrar Usuário</button>
                        {/* <button onClick={() => setIsAlertOpen(true)} className="btn-sm btn-green text-sm ">Filtrar</button> */}
                    </span>
                    <input type="text" className="input-cadastro" placeholder="Insira algo para buscar" />
                </div>

                <div className="flex flex-col justify-center items-center p-5  overflow-y-scroll">
                    {loading ? (<div className="w-full h-full flex justify-center items-center"> <Oval visible={true} height="50" width="50" color="#3BBFA7" secondaryColor="#38A69B" /> </div>) :
                        (<table className=" bg-card-white-1 round w-[97%] flex-grow rounded-xl p-5">
                            <thead className="bg-unifae-green-4 rounded-xl text-white w-full">
                                <tr className="text-center">
                                    <th className="p-5">ID</th>
                                    <th className="p-5">Nome</th>
                                    <th className="p-5">Email</th>
                                    <th className="p-5">Curso</th>
                                    <th className="p-5">Telefone</th>
                                    <th className="p-5">RA</th>
                                    <th className="p-5">Tipo de usuário</th>
                                    <th className="p-5" colSpan={2}></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-unifae-gray50-2">
                                {usuarios.map(response => (
                                    <tr key={response.usuario.id} className="text-center">
                                        <td className="p-5 text-pretty">{response.usuario.id}</td>
                                        <td className="p-5 text-pretty">{response.usuario.nome}</td>
                                        <td className="p-5 text-pretty">{response.usuario.email}</td>
                                        <td className="p-5 text-pretty">{response.curso.nome_curso}</td>
                                        <td className="p-5 text-pretty">{!response.usuario.telefone ? "Sem Telefone" : response.usuario.telefone}</td>
                                        <td className="p-5 text-pretty">{response.usuario.ra}</td>
                                        <td className="p-5 text-pretty">{response.usuario.tipo_usuario}</td>
                                        <td className="p-5 text-pretty">
                                            <button onClick={() => handleTornarResponsavel(response)} className="bg-unifae-green-2 p-2 text-white rounded-lg">Tornar Responsável</button>
                                        </td>
                                        <td className="p-5 flex gap-3">
                                            <button onClick={() => handleEditModal(response)} className="btn-sm btn-edit">Editar</button>
                                            <button onClick={() => handleDelete(response.usuario.id)} className="btn-sm btn-delete">Excluir</button>
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