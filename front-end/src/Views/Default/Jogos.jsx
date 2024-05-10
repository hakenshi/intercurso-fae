import { AlertSucesso } from "../../Components/Alerts/AlertSucesso";
// import { Modal } from "../../Components/Table";
import { useAlert } from "../../Components/hooks/useAlert";

export default function Jogos(){

    const { isAlertOpen, setIsAlertOpen } = useAlert()

    return (
        <div className="flex justify-center gap-5">
        <div className="flex flex-col items-center">
            {/* <Modal>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            <p>TESTE</p>
            </Modal> */}
            {/* <div className="flex"><button onClick={()=> setIsAlertOpen(true)} className="btn-lg btn-gray">Abrir</button></div> */}
        </div>
        </div>
    )
}