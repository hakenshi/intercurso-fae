import { Link, Navigate } from "react-router-dom";
import cursos from "../../../public/cursos.json"
import logoPadrao from "../../assets/logo-unifae-2021.png";
import { useRef, useState } from "react";
import axiosInstance from "../../helper/axios-instance";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useAlert } from "../../Components/hooks/useAlert";
import { AlertErro } from "../../Components/Alerts/AlertErro";
import ReactInputMask from "react-input-mask";
import { images } from "../../assets";
export default function Cadastro() {

    const nomeRef = useRef(null);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const raRef = useRef(null);
    const cursoRef = useRef(null);
    const confirmSenhaRef = useRef(null);

    const { setUser, setSessionToken } = useStateContext()

    const [errors, setError] = useState("")
    const { isAlertOpen, setIsAlertOpen } = useAlert()

    const HandleSubmit = async e => {
        e.preventDefault()

        if (senhaRef.current.value !== confirmSenhaRef.current.value) {
            setError("As senhas não coincidem!")
            setIsAlertOpen(true)
            return
        }

        const payload = {
            id_curso: cursoRef.current.value,
            nome: nomeRef.current.value,
            email: emailRef.current.value,
            senha: senhaRef.current.value,
            confirmSenha: confirmSenhaRef.current.value,
            ra: raRef.current.value,
            tipo_usuario: 3,
        }

        axiosInstance.post('/cadastro', payload)
        .then(({ data })=>{
            setUser(data.user)
            setSessionToken(data.token)
        })
        .catch(error => {
            const response = error.response
            if(response){
               setError(response.data)
            }
        })
    }

    return (
        <>
    {isAlertOpen && (<AlertErro mensagem={errors} onClose={()=> setIsAlertOpen(false)} isAlertOpen={isAlertOpen}/>)}
        <section className="bg-[#262626] min-h-screen flex justify-center items-center">
            <div className="size-full p-3 max-w-screen-lg  bg-white rounded-md">
                <div className="flex items-center flex-col h-1/5 justify-center">
                    <img src={logoPadrao} alt="unifae-logo" className="w-1/2" />
                    <span className="text-unifae-green-1 font-semibold">Intercurso</span>
                </div>
                <form className="flex flex-col md:flex-row justify-center">
                    <div className="flex flex-col w-full md:w-1/2 gap-1 p-2">
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="nome">Nome</label>
                            <input ref={nomeRef} className={`${errors && errors.errors && errors.errors.nome ? 'input-error-cadastro' : 'input-cadastro'}`} type="text" name="nome" id="nome" placeholder="Insira seu nome" />
                            {errors && errors.errors ? errors.errors.nome && <p className="p-1 text-xs text-black/80">{errors.errors.nome[0]}</p> : ""}
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">E-mail</label>
                            <input ref={emailRef} className={`${errors && errors.errors && errors.errors.email ? "input-error-cadastro" : "input-cadastro"}`}  type="text" name="email" id="email" placeholder="Insira seu email institucional" />
                            {errors && errors.errors ? errors.errors.email && <p className="p-1 text-xs text-black/80">{errors.errors.email[0]}</p> : ""}
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="senha">Senha</label>
                            <input ref={senhaRef} className={`${errors && errors.errors && errors.errors.senha ? "input-error-cadastro" : "input-cadastro"}`} type="password" name="senha" id="senha" placeholder="••••••••" />
                            {errors && errors.errors ? errors.errors.senha && <p className="p-1 text-xs text-black/80">{errors.errors.senha[0]}</p> : ""}
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 gap-1 p-2">
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="ra">RA</label>
                            <ReactInputMask mask={"99999-9"} ref={raRef} className={`${errors && errors.errors && errors.errors.ra ? "input-error-cadastro" : "input-cadastro"}`} type="text" name="ra" id="ra" placeholder="00000-0" />
                            {errors && errors.errors ? errors.errors.senha && <p className="p-1 text-xs text-black/80">{errors.errors.ra[0]}</p> : ""}
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">Curso</label>
                            <select ref={cursoRef} className={`${errors && errors.errors && errors.errors.id_curso ? "input-error-cadastro" : "input-cadastro"} bg-white w-80`} name="curso" id="curso" >
                                {cursos.map((curso, key) => <option key={key} value={curso.value}>{curso.curso}</option>)}
                            </select>
                            {errors && errors.errors ? errors.errors.senha && <p className="p-1 text-xs text-black/80">{errors.errors.id_curso[0]}</p> : ""}
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="confirm-password">Confirme sua senha</label>
                            <input ref={confirmSenhaRef} className={`${errors && errors.errors && errors.errors.senha ? "input-error-cadastro" : "input-cadastro"}`} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" />
                            {errors && errors.errors ? errors.errors.senha && <p className="p-1 text-xs text-black/80">{errors.errors.senha[0]}</p> : ""}
                        </div>
                    </div>
                </form>

                <div className="flex gap-2 justify-center items-center w-full pt-5">
                    <input id="default-checkbox" type="checkbox" value="" className="peer check-box" />
                    <label htmlFor="confirm">Estou ciente dos termos e <a href={images.mussum} target="_blank" className="text-unifae-green-1 font-semibold">condições do intercuso da UNIFAE</a></label>
                </div>
                <div className="flex flex-col w-full items-center p-3">
                    <p className="p-2">Já tem conta? <Link to={"/login"} className="text-unifae-green-1 font-semibold"> Clique aqui</Link></p>
                    <button type="submit" onClick={HandleSubmit} className="btn-lg btn-green">Entrar</button>
                </div>
            </div>
        </section>
        </>
    )
}
