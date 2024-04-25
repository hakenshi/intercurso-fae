import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";


export default function GuestLayout(){

    const{ token } = useStateContext()


    if(token){
        return <Navigate to={"/"} replace={true}/>
    }

    return <><Outlet/></>
}