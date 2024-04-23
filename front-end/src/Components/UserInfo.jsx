import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"

export const UserInfo = ({ nome, logout }) =>{
    return(
        <div className="w-full flex justify-center p-4">
            <div className="user-dropdown">
                <span className=" flex w-full text-lg items-center gap-5 p-3"> <img className="min h-10 rounded-full" src={userLogo} alt="" /> {nome} </span>
                <span className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faUser}/>  Perfil </span>
                <span className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faGear}/>  Configurações </span>
              {nome &&  <span onClick={logout} className="cursor-pointer flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon icon={faSignOut}/>  Logout </span> }
            </div>
        </div>
    )
}

UserInfo.propTypes = {
    nome: p.string,
    logout: p.func
}