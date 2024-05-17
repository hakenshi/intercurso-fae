import { useEffect, useState } from "react"
import axiosInstance from "../../helper/axios-instance"

const useNotification = (id) => {
    const [notificacao, setNotificacao] = useState([])
    
    useEffect(() => {
        if (id) {
            axiosInstance.get(`/notificacao/${id}`)
                .then(({ data }) => {
                    if (data && data.data.length > 0) {
                        setNotificacao(data.data);
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

    const readNotification = (data) => {        

        

        if(data){
                axiosInstance.post(`/notificacao/limpar-notificacao`, data.map(({id}) => id.toString()))
                .then(({data}) =>{
                    data.data.forEach(({id}) =>{
                        setNotificacao(n => n.filter(item => id !== item.id))
                    })
                })
                .catch(errors => {
                    const response = errors.response
    
                    if(response){
                        console.log(response.data)
                    }
                })
        }
    }

    return { notificacao, readNotification }
}


export default  useNotification 