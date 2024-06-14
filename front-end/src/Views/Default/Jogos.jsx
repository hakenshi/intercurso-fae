import { useEffect, useState } from "react";
import { Card } from "../../Card";
import axiosInstance from "../../helper/axios-instance";
import { handleError } from "../../utils/handleError";
import { Loading } from "../../Components/Loading";

const time1 = {
    image: null,
    nome: null
}

export default function Jogos() {

    const [jogos, setJogos] = useState([])
    const [modalidades, setModalidades] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       const fetchJogos = () => {
        axiosInstance.get("/jogos")
        .then(({ data }) =>setJogos(data.data))
        .catch(e => handleError(e))
       }
       const fetchModalidades = () => {
        axiosInstance.get("/jogos")
        .then(({ data }) =>setModalidades(data.data))
        .catch(e => handleError(e))
       }

       if(jogos.length === 0){
        fetchJogos()
        setLoading(false)
       }
       if(modalidades.length === 0){
        fetchModalidades()
        setLoading(false)
       }
       

    }, [jogos, modalidades])

    const handleChangeFiltros = (data, filtro) => {
        const filter = data.length > 0 ? data.filter(item => item.includes(filtro)) : []
    }

    if(loading){
        return <Loading />
    }

    return (
        <>
        <div>
            <h1 className="text-center p-2 text-3xl uppercase font font-bold">Veja os jogos os jogos do intercurso</h1>
            <div className="w-s md:max-w-screen-xl flex flex-col gap-10 overflow-x-scroll p-5 justify-center items-center">
                <h3 className="tex">Modalidades</h3>
                <div className="flex justify-center">
                </div>
            </div>
            <div className="w-full flex items-center justify-center gap-5">
                <select className="input-cadastro bg-white" name="" id="">
                    <option value="">Próximos Jogos</option>
                    <option value="">Acontecendo Agora</option>
                    <option value="">Encerrados</option>
                </select>
            </div>
            <div className="p-5 flex justify-center gap-5 flex-wrap md:max-w-screen-xl max-h-[690px] overflow-y-scroll">
                {jogos.map(jogo =>
                    (
                        <Card.Root key={jogo.jogo.id}>
                            <Card.TimePlacar modalidade={jogo.modalidade.nome} placar={jogo.placar} times={jogo.times}/>
                            <Card.Local local={`Encerrado`} />
                            <Card.Info data={`Vencedor: ${jogo.placar.time_vencedor.nome}`} />
                        </Card.Root>
                    )
                )}
            </div>
        </div>
        </>
    )
}