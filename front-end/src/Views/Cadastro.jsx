import { Link } from "react-router-dom";
import logoPadrao from "../assets/logo-unifae-2021.png";

export default function Cadastro() {
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
                            <input className="input-cadastro" type="text" name="nome" id="nome" placeholder="Insira seu nome" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">E-mail</label>
                            <input className="input-cadastro" type="text" name="email" id="email" placeholder="email@email.com" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="senha">Senha</label>
                            <input className="input-cadastro" type="password" name="senha" id="senha" placeholder="••••••••" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 gap-1">
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="ra">RA</label>
                            <input className="input-cadastro" type="password" name="ra" id="ra" placeholder="00000-0" />
                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="email">Curso</label>
                            <select className="input-cadastro bg-white" name="curso" id="curso">
                                <option value="">Selecione seu curso</option>
                                <option value="1">Administração</option>
                                <option value="2">Ciências Contábeis</option>
                                <option value="3">Direito</option>
                                <option value="4">Educação Física (Bacharelado)</option>
                                <option value="5">Enfermagem</option>
                                <option value="6">Engenharia Civil</option>
                                <option value="7">Engenharia Elétrica</option>
                                <option value="8">Engenharia Mecânica</option>
                                <option value="9">Engenharia Química</option>
                                <option value="10">Engenharia da Computação</option>
                                <option value="11">Engenharia de Produção</option>
                                <option value="12">Engenharia de Software</option>
                                <option value="13">Farmácia</option>
                                <option value="14">Fisioterapia</option>
                                <option value="15">Jornalismo</option>
                                <option value="16">Medicina</option>
                                <option value="17">Odontologia</option>
                                <option value="18">Pedagogia</option>
                                <option value="19">Psicologia</option>
                                <option value="20">Publicidade e Propaganda</option>
                                <option value="21">Engenharia Biomédica</option>
                                <option value="22">Educação Fisica (Licenciatura)</option>
                                <option value="23">Comunicação e Mídias digitais</option>
                                <option value="24">Economia</option>
                            </select>

                        </div>
                        <div className="flex flex-col m-auto">
                            <label className="text-start text-lg" htmlFor="confirm-password">Confirme sua senha</label>
                            <input className="input-cadastro" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" />
                        </div>
                    </div>
                </form>

                <div className="flex gap-2 justify-center items-center w-full pt-5">
                    <input id="default-checkbox" type="checkbox" value="" className="peer check-box" />
                    <label htmlFor="confirm">Estou ciente dos termos e <span className="text-unifae-green-1 font-semibold">condições do intercuso da UNIFAE</span></label>
                </div>
                <div className="flex flex-col w-full items-center p-3">
                    <p className="p-2">Já tem conta? <Link to={"/login"} className="text-unifae-green-1 font-semibold"> Clique aqui</Link></p>
                    <button className="bg-unifae-green-1 text-unifae-white-1 w-[200px] h-[50px] rounded-md">Entrar</button>
                </div>
            </div>
        </section>
    )
}
