import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './Contexts/ContextProvider.jsx'


export const App = () => {

    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}