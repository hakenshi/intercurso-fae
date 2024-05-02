import { useEffect, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import { Times } from "../Admin/Times"

export const MeusTimes = () => {
    
    const {user} = useStateContext();

    return (
        <>
            <Times id={user.id}/>
        </>
    )
}
