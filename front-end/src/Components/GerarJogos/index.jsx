import React, {useEffect, useState} from 'react';
import axiosInstance from "../../helper/axios-instance.js";
import {Modal} from "../Modal/index.jsx";
import {handleError} from "../../utils/handleError.js";
import {generateMatches} from "../../utils/generateMatches.js";

const Index = () => {

    const [times, setTimes] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const handleFetchTimes = async () => {
        setIsOpen(true)
        const {data} = await axiosInstance.get('/times')

        if(data.length > 0){
        setTimes(data.times)
        }
    }
    const handleClose = () => {
    setIsOpen(false)
    setTimes([])
    }

    const handleGenerateMatches = () => {
        const time = times.map(time => time.time)

        const {chaveChapeu,chavePrincipal} = generateMatches(time)
        // await new Promise(resolve => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 1000)
        // })
        console.log(`Chave do chapéu: ${chaveChapeu.length}\n`);
        chaveChapeu.forEach(jogos => console.log(jogos));

        console.log(`Chave principal: ${chavePrincipal.length}\n`);
        chavePrincipal.forEach(jogos => console.log(jogos));
    }

    return (
        <>
            <Modal.Root isOpen={isOpen} onClose={()=> handleClose()}>
                <Modal.Default>
                    <Modal.Button type={"button"} texto={'Gerar Chaves'} onClick={() => handleGenerateMatches()}/>
                </Modal.Default>
            </Modal.Root>

            <button className="btn-green p-2" onClick={() => handleFetchTimes()}>Gerar Chaves</button>
        </>
    );
};

export default Index;