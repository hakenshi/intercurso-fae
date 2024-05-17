import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"
import { Link, NavLink } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import { forwardRef, useRef, useState } from "react";
import { useClickOutSide } from "./hooks/useClickOutside";

export const UserInfo = ({ nome, logout, foto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const perfilRef = useClickOutSide(() => setIsOpen(false))

    return (
        <div ref={perfilRef}>
        <ProfileImage onClick={() => setIsOpen(o => !o)} className={"w-10 h-10 rounded-full object-cover"} fotoPerfil={foto}/>
        <div className={`absolute top-11 right-0 overflow-hidden transition-h duration-500 ${isOpen ? "h-96 ease-in" : "h-0 ease-out"}`}>
            {isOpen && <div className="w-full flex justify-center p-4">
                <div className="user-dropdown">
                    <span className=" flex w-full text-lg items-center gap-5 p-3">
                        <ProfileImage className={"w-10 h-10 rounded-full object-cover"} fotoPerfil={foto} />
                        {nome} </span>
                    <Link onClick={() => setIsOpen(false)} to={"/usuario/meu-perfil"} className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"><FontAwesomeIcon icon={faUser} />  Perfil </Link>
                    <span className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faGear} />  Configurações </span>
                    {nome && <span onClick={logout} className="cursor-pointer flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faSignOut} />  Logout </span>}
                </div>
            </div>}
        </div>
        </div>

    )
}