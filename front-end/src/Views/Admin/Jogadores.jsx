import { useEffect } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"


export const Jogadores = () =>{

    const {user} = useStateContext()
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.tipo_usuario != 1) navigate('/jogos', {replace: true}) 
    }, [])

    return('Usuarios')
}