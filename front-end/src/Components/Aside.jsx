import { createContext, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AsideItem from "./AsideItem";
import { faGamepad, faSignIn, faTrophy, faFlag, faUserPlus, faUserGroup, faChartLine, faMedal } from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"
import { icon, text } from "@fortawesome/fontawesome-svg-core";
import { AiOutlineTeam } from "react-icons/ai";
import { useStateContext } from "../Contexts/ContextProvider";

export const Aside = ({ isAsideVisible }) => {

    const { user } = useStateContext()

    const userLinks = [

        {
            path: '/jogos',
            icon: faGamepad,
            text: 'Jogos'
        },
        {
            path: `${user.tipo_usuario == 2 ? "/meus-times" : "/meu-time"}`,
            icon: faUserGroup,
            text: `${user.tipo_usuario == 2 ? "Meus Times" : "Meu Time"}`
        },
        {
            path: '/times-intercurso',
            icon: faFlag,
            text: 'Times'
        },
        {
            path: '/placares',
            icon: faTrophy,
            text: 'Placares'
        },

    ]



    const adminLinks = [
        {
            path: '/dashboard',
            icon: faChartLine,
            text: 'Dashboard',

        },
        {
            path: '/usuarios',
            icon: faUserGroup,
            text: 'Usuarios',

        },
        {
            path: '/modalidades',
            icon: faMedal,
            text: 'Modalidades',

        },
        {
            path: '/times',
            icon: faFlag,
            text: 'Times',

        },
        
    ]


    return (
        <aside
            className={`h-[92.2vh] w-[200px] p-3 bg-zinc-700 ${isAsideVisible ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-500`}
        >
            <div className="flex flex-col justify-around h-[60%] ">
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    {!sessionStorage.getItem('ACCESS_TOKEN') && (<>
                        <Link to="/login">
                            <AsideItem icon={faSignIn} text="Login" />
                        </Link>
                        <Link to="/cadastro">
                            <AsideItem icon={faUserPlus} text="Cadastro" />
                        </Link>
                    </>)}
                </div>
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    {user.tipo_usuario == 1 ? adminLinks.map((userLink, index) => (
                        <NavLink key={index} to={userLink.path}>
                            <AsideItem icon={userLink.icon} text={userLink.text} />
                        </NavLink>
                    )) : userLinks.map((userLink, index) => (
                        <NavLink key={index} to={userLink.path}>
                            <AsideItem icon={userLink.icon} text={userLink.text} />
                        </NavLink>
                    ))}
                </div>
            </div>
        </aside>
    );
}

Aside.propTypes = {
    isAsideVisible: p.bool
}