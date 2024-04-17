import { Link } from "react-router-dom"
import logoPadrao from "../assets/logo-unifae-2021.png"

export default function Login(){
    return(
        <div className=" bg-[#262626] min-h-screen flex justify-center items-center">
            <div className="w-11/12 md:1/2 bg-white rounded-md lg:w-[33vw] lg:h-[55vh]">
                <div className="flex items-center flex-col h-[15vh] justify-center"> 
                    <img src={logoPadrao} alt="unifae-logo" className="w-[300px]" />
                    <span className="text-unifae-green-1 font-semibold">Intercurso</span>
                </div>
                <form className="flex flex-col items-center gap-6 p-4 lg:p-0">
                    <div className="flex flex-col justify-center">
                        <label className="text-lg" htmlFor="email">Email</label>
                        <input className="input-login" type="text" name="email" id="email" placeholder="email@email.com"/>
                    </div>
                    <div className="flex flex-col justify-center">
                        <label className="text-lg" htmlFor="email">Senha</label>
                        <input className="input-login" type="password" name="senha" id="senha" placeholder="••••••••"/>
                    </div>
                    <p>Esqueceu sua senha? <span className="text-unifae-green-1 font-bold">Clique aqui</span></p>
                    <button className="bg-unifae-green-1 text-unifae-white-1 w-[200px] h-[50px] rounded-md">Entrar</button>
                    <p>Ainda não tem conta? <Link to={"/cadastro"} className="text-unifae-green-1 font-bold">lique aqui</Link></p>
                </form>
            </div>
        </div>
    )
}