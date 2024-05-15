import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"
import { Link, NavLink } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import { forwardRef } from "react";

export const UserInfo = forwardRef(({ nome, logout, foto, isDropDownVisible }, ref) => {

    return (
        <span ref={ref} className={`absolute top-11 right-0 ${isDropDownVisible ? 'opacity-100' : "opacity-0 hidden"} transition-opacity duration-500`}>
            {isDropDownVisible && <div className="w-full flex justify-center p-4">
                <div className="user-dropdown">
                    <span className=" flex w-full text-lg items-center gap-5 p-3">
                        <ProfileImage className={"w-10 h-10 rounded-full object-cover"} fotoPerfil={foto} />
                        {nome} </span>
                    <Link to={"/usuario/meu-perfil"} className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"><FontAwesomeIcon icon={faUser} />  Perfil </Link>
                    <span className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faGear} />  Configurações </span>
                    {nome && <span onClick={logout} className="cursor-pointer flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faSignOut} />  Logout </span>}
                </div>
            </div>}
        </span>

    )
})

UserInfo.displayName = "UserInfo"

UserInfo.propTypes = {
    nome: p.string,
    logout: p.func,
    isDropDownVisible: p.bool
}