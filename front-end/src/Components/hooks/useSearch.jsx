import { Axios } from "axios"
import { useCallback, useState } from "react"
import axiosInstance from "../../helper/axios-instance"

export const useSearch = (data,url) => {
    const [input, setInput] = useState(data)
    const [results, setResults] = useState([])

    const fetchData = useCallback((value) => {

        if (value.trim() === "") setResults([])

        else {
            axiosInstance.get(url, {
                params: {
                    value: value
                }
            })
                .then(({ data }) => {
                    setResults(data.data)
                })
                .catch(error => console.log(error))
        }
    }, [url])

    return { input, setInput, results, setResults, fetchData }
}