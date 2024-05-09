import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import axiosInstance from "../../helper/axios-instance"
import p from "prop-types"
import { SearchResultList } from "./SearchResultList"

export const Search = ({ placeholder, url, handleSelectUser, data, onAddJogador }) => {

    const [input, setInput] = useState(data)
    const [results, setResults] = useState([])

    const fetchData = (value) => {

        if (value.trim() === "") setResults([])

        else {
            axiosInstance.get(url, {
                params: {
                    value: value
                }
            })
                .then(({ data }) => {
                    setResults(data)
                })
                .catch(error => console.log(error))
        }
    }

    const handleChange = value => {
        setInput(value)
        fetchData(value)
    }

    const handleResultClick = (id, nome) =>{
        setInput(nome)
        setResults([])
        handleSelectUser(id)
        onAddJogador()
    }

    return (
        <>
            <div className="space-y-2">
                    <input className="input-modal space-y-2" type="text" placeholder={placeholder} value={input} onChange={(e) => handleChange(e.target.value)} />
                    <SearchResultList results={results} onClick={handleResultClick}/>
            </div>

            
        </>
    )
}

Search.propTypes = {
    placeholder: p.string,
    url: p.string,
}