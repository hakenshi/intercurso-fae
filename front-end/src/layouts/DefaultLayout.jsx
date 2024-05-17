import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faL } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";
import logoBranca from "../assets/logo-unifae-2021-branca.png";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import { faGamepad, faSignIn, faTrophy, faFlag, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AsideItem from "../Components/Aside/AsideItem";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import { UserInfo } from "../Components/UserInfo";
import { Aside } from "../Components/Aside/Aside";
import { ProfileImage } from "../Components/ProfileImage";
import { Notficacao } from "../Components/Notficacao";
import { useClickOutSide } from "../Components/hooks/useClickOutside";

// Criando o contexto
const AsideContext = createContext();

export default function DefaultLayout() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const [isDropDownVisible, setisDropDownVisible] = useState(false)
    const { user, token, setUser, setSessionToken } = useStateContext()

    const navigate = useNavigate()

    const toggleAsideVisibility = () => {
        setIsAsideVisible(a => !a);
    };

    useEffect(() => {
        if(sessionStorage.getItem('ACCESS_TOKEN')){
            axiosInstance.get('/user')
            .then(({ data }) => {
                setUser(data)
                if(data.tipo_usuario == 1) navigate('/dashboard', {replace: true})
            })
        }
        
    }, [navigate, setUser])
    
    const onLogout = (e) => {
        e.preventDefault()

        axiosInstance.post('/logout')
            .then(() => {
                setUser({})
                setSessionToken(null)
                navigate("/login", {replace: true})
            })
        }
                
    return (
        <div className="flex flex-col">
            <header className="bg-unifae-green-1 w-screen shadow-xl">
                <nav className="p-4 flex justify-between">
                    <div className="flex items-center gap-3 text-white">
                        {isMobile ? (
                            <button className="block" onClick={toggleAsideVisibility}>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                       ): (
                            <div className="flex items-center gap-3">
                                
                                <a href="https://www.fae.br/unifae2/" target="_blank">
                                    <img className="w-[125px]" src={logoBranca} alt="unifae-logo" />
                                </a>
                                <span>Intercurso</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-7">
                            <Notficacao id={user.id} />
                            <UserInfo logout={onLogout} isDropDownVisible={isDropDownVisible} nome={user.nome} foto={user.foto_perfil}/>
                    </div>
                </nav>
            </header>
            <div className="flex">
                <AsideContext.Provider value={{ isAsideVisible, toggleAsideVisibility }}>
                    <Aside isAsideVisible={isAsideVisible} />
                </AsideContext.Provider>
                <div className={`${isAsideVisible ? "flex-grow" : "flex-grow-0"}`}>
                    <main className="flex justify-center items-center xl:w-full w-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

