import { Link, Navigate } from "react-router-dom";
import logoPadrao from "../assets/logo-unifae-2021.png";
import { useRef, useState } from "react";
import axios from "axios";
import axiosInstance from "../helper/axios-instance";
import { useStateContext } from "../Contexts/ContextProvider";
export default function Cadastro() {

    const nomeRef = useRef(null);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const raRef = useRef(null);
    const cursoRef = useRef(null);
    const confirmSenhaRef = useRef(null);

    const { token, setUser, setToken } = useStateContext()

    const [errors, setError] = useState("")


    const cursos = [
        { value: "", curso: "Selecione seu curso" },
        { value: "1", curso: "Administração" },
        { value: "2", curso: "Ciências Contábeis" },
        { value: "3", curso: "Direito" },
        { value: "4", curso: "Educação Física (Bacharelado)" },
        { value: "5", curso: "Enfermagem" },
        { value: "6", curso: "Engenharia Civil" },
        { value: "7", curso: "Engenharia Elétrica" },
        { value: "8", curso: "Engenharia Mecânica" },
        { value: "9", curso: "Engenharia Química" },
        { value: "10", curso: "Engenharia da Computação" },
        { value: "11", curso: "Engenharia de Produção" },
        { value: "12", curso: "Engenharia de Software" },
        { value: "13", curso: "Farmácia" },
        { value: "14", curso: "Fisioterapia" },
        { value: "15", curso: "Jornalismo" },
        { value: "16", curso: "Medicina" },
        { value: "17", curso: "Odontologia" },
        { value: "18", curso: "Pedagogia" },
        { value: "19", curso: "Psicologia" },
        { value: "20", curso: "Publicidade e Propaganda" },
        { value: "21", curso: "Engenharia Biomédica" },
        { value: "22", curso: "Educação Física (Licenciatura)" },
        { value: "23", curso: "Comunicação e Mídias digitais" },
        { value: "24", curso: "Economia" }
    ];


    const HandleSubmit = async e => {
        e.preventDefault()

        // if (senhaRef !== confirmSenhaRef) {
        //     setError("As senhas não coincidem!")
        //     alert(error)
        //     return
        // }

        const payload = {
            id_curso: cursoRef.current.value,
            nome: nomeRef.current.value,
            email: emailRef.current.value,
            senha: senhaRef.current.value,
            confirmSenha: confirmSenhaRef.current.value,
            ra: raRef.current.value,
            tipo_usuario: "3",
        }

        axiosInstance.post('/cadastro', payload)
        .then(({ data })=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(error => {
            const response = error.response
            if(response){
                setError(response.data.error)
                console.log(errors)
            }
        })
        .finally(()=>{
            if(sessionStorage.getItem("ACCESS_TOKEN")){
                location.href = "/"
            }

        })
    }

    return (
        <section className="bg-[#262626] min-h-screen flex justify-center items-center">
            <div className="w-full md:h-full max-w-screen-lg p-5 bg-white rounded-md">
                <div className="flex items-center flex-col h-1/5 justify-center">
                    <img src={logoPadrao} alt="unifae-logo" className="w-[300px]" />
                    <span className="text-unifae-green-1 font-semibold">Intercurso</span>
                </div>
                <form className="flex flex-col md:flex-row justify-center">
                    <div className="flex flex-col w-full md:w-1/2 gap-1">
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="nome">Nome</label>
                            <input ref={nomeRef} className="input-cadastro" type="text" name="nome" id="nome" placeholder="Insira seu nome" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">E-mail</label>
                            <input ref={emailRef} className="input-cadastro" type="text" name="email" id="email" placeholder="email@email.com" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="senha">Senha</label>
                            <input ref={senhaRef} className="input-cadastro" type="password" name="senha" id="senha" placeholder="••••••••" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 gap-1">
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="ra">RA</label>
                            <input ref={raRef} className="input-cadastro" type="text" name="ra" id="ra" placeholder="00000-0" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">Curso</label>
                            <select ref={cursoRef} className="input-cadastro bg-white" name="curso" id="curso">
                                {cursos.map((curso, key) => <option key={key} value={curso.value}>{curso.curso}</option>)}
                            </select>

                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="confirm-password">Confirme sua senha</label>
                            <input ref={confirmSenhaRef} className="input-cadastro" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" />
                        </div>
                    </div>
                </form>

                <div className="flex gap-2 justify-center items-center w-full pt-5">
                    <input id="default-checkbox" type="checkbox" value="" className="peer check-box" />
                    <label htmlFor="confirm">Estou ciente dos termos e <span className="text-unifae-green-1 font-semibold">condições do intercuso da UNIFAE</span></label>
                </div>
                <div className="flex flex-col w-full items-center p-3">
                    <p className="p-2">Já tem conta? <Link to={"/login"} className="text-unifae-green-1 font-semibold"> Clique aqui</Link></p>
                    <button type="submit" onClick={HandleSubmit} className="bg-unifae-green-1 text-unifae-white-1 w-[200px] h-[50px] rounded-md">Entrar</button>
                </div>
            </div>
        </section>
    )
}
