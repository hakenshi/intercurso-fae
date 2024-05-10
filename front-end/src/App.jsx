import { Navigate, Route, Router, RouterProvider, Routes } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './Contexts/ContextProvider.jsx'
import DefaultLayout from './layouts/DefaultLayout.jsx'
import Jogos from "./Views/Default/Jogos";
import Placares from "./Views/Default/Placares";
import VerTimes from "./Views/Default/VerTimes";
import Login from "./Views/Guest/Login";
import Cadastro from "./Views/Guest/Cadastro";
import NotFound from "./Views/html error codes/NotFound";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./Views/Admin/Dashboard";
import { Modalidades } from "./Views/Admin/Modalidades";
import { Times } from "./Views/Admin/Times";
import { Usuarios } from "./Views/Admin/Usuarios";
import { MeusTimes } from "./Views/Responsavel/MeusTimes";
import { Perfil } from "./Views/Default/Perfil";
import { EditarPerfil } from "./Views/Default/EditarPerfil";
import { Configuracoes } from "./Views/Default/Configuracoes";

export const App = () => {

    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}