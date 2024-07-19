import React from 'react'

export const DisplaySearch = ({handleSearch, placeholder = "Insira algo para buscar"}) => {
    return (
        <input type="text" className="input-cadastro" placeholder={placeholder} onChange={handleSearch}/>
    )
}
