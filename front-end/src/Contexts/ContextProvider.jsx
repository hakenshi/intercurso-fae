import { createContext, useState, useContext, useEffect } from "react";
import p from "prop-types"
import { Navigate } from "react-router-dom";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setSessionToken: () => {},
})

export const ContextProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);

    const setSessionToken = (token) =>{
        setToken(token)

        if(token){
            sessionStorage.setItem('ACCESS_TOKEN', token);
        }
        else{
            sessionStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return(
        <StateContext.Provider value={{ user, token, setUser, setSessionToken }}> 
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)