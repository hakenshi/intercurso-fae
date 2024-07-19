import React, {useState} from 'react';
import {useFormStatus} from "react-dom"
import axiosInstance from "../../helper/axios-instance.js";
import {Modal} from "../Modal/index.jsx";
import {generateMatches} from "../../utils/generateMatches.js";
import {Loading} from "../Loading.jsx";
import {faL} from '@fortawesome/free-solid-svg-icons';
import {handleError} from '../../utils/handleError.js';


export const GerarJogos = () => {

    const [times, setTimes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setIsLoading] = useState(false)


    const handleFetchTimes = async () => {
        const {data} = await axiosInstance.get('/times')
        if (data.times) {
            setIsOpen(true)
            setTimes(data.times)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setTimes([])
    }

    const handleGenerateMatches = async () => {
        // setIsLoading(true)
        const time = times.map(({time}) => time.id)
        const modalidade = times.map(({modalidade}) => modalidade.id_modalidade)

        const {faseChapeu, primeiraFase, segundaFase, terceiraFase} = generateMatches(time)

        axiosInstance.post("/jogos/gerar-chaves", {
            faseChapeu,
            primeiraFase,
            segundaFase,
            terceiraFase,
            id_modalidade: modalidade[0]
        })
            .then(({data}) => {
                setIsLoading(false)
                console.log(data)
            })
            .catch(e => {
                setIsLoading(false)
                handleError(e)
            })
    }
    return (
        <>
            <Modal.Root isOpen={isOpen} onClose={() => handleClose()}>
                <Modal.Default>
                    <Modal.Button disabled={loading} type={"button"} texto={loading ? <Loading/> : "Gerar Chaves"}
                                  onClick={() => handleGenerateMatches()}/>
                </Modal.Default>
            </Modal.Root>

            <button className="btn-green p-2" onClick={() => handleFetchTimes()}>Gerar Chaves</button>
        </>
    );
};
