import { AlertConfirm } from "../../Components/AlertConfirm";
import { AlertErro } from "../../Components/AlertErro";
import { AlertSucesso } from "../../Components/AlertSucesso";

export default function Jogos(){
    return (
        <div className="flex justify-center gap-5">
        <AlertConfirm/>
        <AlertSucesso/>
        <AlertErro/>
        </div>
    )
}