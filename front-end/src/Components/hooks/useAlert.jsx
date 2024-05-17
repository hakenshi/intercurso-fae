import { useState } from "react"

export const useAlert = () =>{
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleClose = () =>{
        setIsAlertOpen(false)
    }
    return{
        isAlertOpen,
        setIsAlertOpen,
        handleClose,
    }
}

