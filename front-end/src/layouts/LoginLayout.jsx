import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";


export default function LoginLayout(){

    const{ token } = useStateContext()
    
    return token ? <Navigate to={"/"} replace={true}/> : <Outlet/>
}