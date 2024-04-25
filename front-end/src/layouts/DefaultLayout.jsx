import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@react-hook/media-query";
import logoBranca from "../assets/logo-unifae-2021-branca.png";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import { faGamepad, faSignIn, faTrophy, faFlag, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AsideItem from "../Components/AsideItem";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import { UserInfo } from "../Components/UserInfo";
import { Aside } from "../Components/Aside";

// Criando o contexto
const AsideContext = createContext();

export default function DefaultLayout() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const [isDropDownVisible, setisDropDownVisible] = useState(false)
    const { user, token, setUser, setSessionToken } = useStateContext()
    const userInfoRef = useRef()
    const navigate = useNavigate()
    const toggleAsideVisibility = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    useEffect(() => {
        if(sessionStorage.getItem('ACCESS_TOKEN')){
            axiosInstance.get('/user')
            .then(({ data }) => {
                setUser(data)
                if(data.tipo_usuario == 1) navigate('/dashboard', {replace: true})
            })

        }
        
    }, [])
    
    const onLogout = (e) => {
        e.preventDefault()

        axiosInstance.post('/logout')
            .then(() => {
                setUser({})
                setSessionToken(null)
                navigate("/login", {replace: true})
            })
        }        

        useEffect(()=>{
            const handler = (e) =>{
                if(userInfoRef.current && !userInfoRef.current.contains(e.target)){
                setisDropDownVisible(false)
            }
            }
            document.addEventListener("mousedown", handler)

            return() => document.removeEventListener("mousedown", handler)
        }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-unifae-green-1 w-screen shadow-xl">
                <nav className="p-4 flex justify-between">
                    <div className="flex items-center gap-3 text-white">
                        {isMobile && (
                            <button className="block md:hidden" onClick={toggleAsideVisibility}>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        )}
                        {!isMobile && (
                            <div className="flex items-center gap-3">
                                <a href="https://www.fae.br/unifae2/" target="_blank">
                                    <img className="w-[125px]" src={logoBranca} alt="unifae-logo" />
                                </a>
                                <span>Intercurso</span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center items-center gap-3">
                        <span className="text-white cursor-pointer">
                            <FontAwesomeIcon icon={faBell} />
                        </span>

                        {user.nome && (
                       <span ref={userInfoRef} className={`absolute top-11 right-0 ${isDropDownVisible ? 'opacity-100' : "opacity-0"} transition-all duration-500`}>
                            <UserInfo logout={onLogout} isDropDownVisible={isDropDownVisible} nome={user.nome}/>
                        </span> 
                    )}

                        <span onClick={() => setisDropDownVisible(!isDropDownVisible)} className="flex justify-center items-center cursor-pointer">
                            <img  className="w-10 h-10 rounded-full" src={userLogo} alt={user.nome} />
                        </span>
                       
                    </div>
                </nav>
            </header>
            <div className="flex">
                <AsideContext.Provider value={{ isAsideVisible, toggleAsideVisibility }}>
                    <Aside isAsideVisible={isAsideVisible} />
                </AsideContext.Provider>
                <div className={`${isAsideVisible ? "flex-grow" : "w-full"}`}>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

