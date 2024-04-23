import { createContext, useContext, useEffect, useState } from "react";
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

// Criando o contexto
const AsideContext = createContext();

export default function DefaultLayout() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const [isDropDownVisible, setisDropDownVisible] = useState(false)
    const { user, token, setUser, setSessionToken } = useStateContext()

    const toggleAsideVisibility = () => {
        setIsAsideVisible(!isAsideVisible);
    };

    useEffect(() => {
        if(sessionStorage.getItem('ACCESS_TOKEN')){
            axiosInstance.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
        }
        
    }, [setUser])

    const onLogout = (e) => {
        e.preventDefault()

        axiosInstance.post('/logout')
            .then(() => {
                setUser({})
                setSessionToken(null)
            })
            .finally(()=> location.href = "/login")            
        }        

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
                        <span onClick={() => setisDropDownVisible(!isDropDownVisible)} className="flex justify-center items-center cursor-pointer">
                            <img  className="w-10 h-10 rounded-full" src={userLogo} alt="" />
                        </span>
                       {user.nome && <span className={`absolute top-11 right-0 ${isDropDownVisible ? 'opacity-100' : "opacity-0"} transition-all duration-500`}>
                            <UserInfo logout={onLogout} nome={user.nome}/>
                        </span> }
                    </div>
                </nav>
            </header>
            <div className="flex">
                <AsideContext.Provider value={{ isAsideVisible, toggleAsideVisibility }}>
                    <Aside/>
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

// Componente do aside
function Aside() {
    const { isAsideVisible } = useContext(AsideContext);

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
                    <NavLink to="/jogos">
                        <AsideItem icon={faGamepad} text="Jogos" />
                    </NavLink>
                    <NavLink to={"/placares"}>
                        <AsideItem icon={faTrophy} text="Placares" />
                    </NavLink>
                    <NavLink to="/times">
                        <AsideItem icon={faFlag} text="Times" />
                    </NavLink>
                </div>
            </div>
        </aside>
    );
}
