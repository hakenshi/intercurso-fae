import { Link, Navigate } from "react-router-dom"
import logoPadrao from "../../assets/logo-unifae-2021.png"
import { useRef, useState } from "react"
import axiosInstance from "../../helper/axios-instance"
import { useStateContext } from "../../Contexts/ContextProvider";


export default function Login(){

    const emailRef = useRef(null)
    const senhaRef = useRef(null)
    const { token, setUser, setSessionToken } = useStateContext()
    const [errors, setError] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            senha: senhaRef.current.value,
        }
        axiosInstance.post('/login', payload)
        .then(({ data })=>{
            setUser(data.user)
            setSessionToken(data.token)
        })
        .catch(error => {
            const response = error.response
            if(response){
                setError(response.data)
                console.log(errors)
            }
        })
    }

    return(
        <div className=" bg-[#262626] min-h-screen flex justify-center items-center">
            <div className="md:w-1/2 bg-white rounded-md lg:w-[33vw] p-3 md:p-5 lg:p-10">
                <div className="flex items-center flex-col h-[15vh] justify-center"> 
                    <img src={logoPadrao} alt="unifae-logo" className="w-[300px]" />
                    <span className="text-unifae-green-1 font-semibold">Intercurso</span>
                </div>
                <form className="flex flex-col items-center gap-6 p-4 lg:p-0" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center">
                        <label className="text-lg" htmlFor="email">Email</label>
                        <input ref={emailRef} className="input-login" type="text" name="email" id="email" placeholder="email@email.com"/>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="text-lg" htmlFor="email">Senha</label>
                        <input ref={senhaRef} className="input-login" type="password" name="senha" id="senha" placeholder="••••••••"/>
                    </div>
                    <p>Esqueceu sua senha? <span className="text-unifae-green-1 font-bold">Clique aqui</span></p>
                    <button className="btn-lg btn-green">Entrar</button>
                    <p>Ainda não tem conta? <Link to={"/cadastro"} className="text-unifae-green-1 font-bold">Clique aqui</Link></p>
                </form>
            </div>
        </div>
    )
}