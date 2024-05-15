import { useEffect, useState } from "react"
import axiosInstance from "../../helper/axios-instance"

const useNotification = (id) => {
    const [notificacao, setNotificacao] = useState([])

    
    useEffect(() => {
        if (id) {
            axiosInstance.get(`/notificacoes/${id}`)
                .then(({ data }) => {
                    if (data && data.data.length > 0) {
                        setNotificacao(data);
                    }
                })
                .catch(errors => {
                    const response = errors.response

                    if (response) {
                        console.log(response.data)
                    }
                })
        }
    }, [id])

    return { setNotificacao, notificacao, hasNotification: notificacao.length > 0 }
}


export default  useNotification 