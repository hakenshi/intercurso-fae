import { useEffect } from "react";
import { useStateContext } from "../Contexts/ContextProvider"
import axiosInstance from "../helper/axios-instance";
import { Navigate, Outlet } from "react-router-dom";

export const UsuarioRoute = ({ role }) => {

    const { setUser, token, user } = useStateContext()

    useEffect(() => {
        if (token && !user) {
            axiosInstance.get('/user')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }, [token, user, setUser]);

    if(!token){
        return <Navigate to={"/login"} replace />
    }
    
    console.log(user.tipo_usuario)

    if(user && user.tipo_usuario != 3){
        return <Navigate to={"/"} replace />
    }

   return <Outlet />
}
