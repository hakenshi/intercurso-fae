import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons"
import logoBranca from "../assets/logo-unifae-2021-branca.png"
import userLogo from "../assets/blank-profile-picture-973460_640.png"
import { faGamepad, faHouse, faSignIn, faTrophy, faFlag, faUserPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import AsideItem from "../Components/AsideItem"
import { NavLink, Outlet } from "react-router-dom"

export default function DefaultLayout(){
    return(
        <div className="flex flex-col min-h-screen">
        <header className="bg-unifae-green-1 w-screen shadow-xl">
            <nav className="p-4 flex justify-between">
                <div className="flex items-center gap-3 text-white"><a href="https://www.fae.br/unifae2/" target="_blank"><img className="w-[125px]" src={logoBranca} alt="unifae-logo" /></a>Intercurso</div>
                <div className="flex justify-center items-center gap-3">
                    <span className="text-white cursor-pointer"><FontAwesomeIcon icon={faBell} /></span>
                    <span className="flex justify-center items-center cursor-pointer"><img className="w-10 h-10 rounded-full" src={userLogo} alt="" /></span>
                </div>
            </nav>
        </header>
        <div className="flex">
            <aside className="h-[92.2vh] w-fit p-3 bg-zinc-700">
                <div className="flex flex-col divide-y-[1px] divide-unifae-gray50-2 mb-5">
                    <AsideItem icon={faHouse} text="Dashboard"/>
                </div>
            <div className="flex flex-col justify-around h-[37.5vh] ">
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    <NavLink to="/login"><AsideItem icon={faSignIn} text="Login"/></NavLink> 
                    <NavLink to="/cadastro"><AsideItem icon={faUserPlus} text="Cadastro"/></NavLink>
                </div>
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    <NavLink to="/jogos"><AsideItem icon={faGamepad} text="Jogos"/></NavLink>
                    <NavLink to={"/placares"}><AsideItem icon={faTrophy} text="Placares" /></NavLink>
                   <NavLink to="/times"> <AsideItem icon={faFlag} text="Times" /></NavLink>
                </div>
            </div>
            </aside>
        <div className="flex-grow">
            <main>
                <Outlet/>
            </main>
        </div>
        </div>
        </div>

)
}