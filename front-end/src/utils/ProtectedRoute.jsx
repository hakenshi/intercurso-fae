import { useEffect, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider"
import axiosInstance from "../helper/axios-instance";
import { Navigate, Outlet } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const ProtectedRoute = ({ role }) => {
    const { setUser, token, user } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token && !user) {
            console.log('Fetching user data...');
            axiosInstance.get('/user')
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                    console.log('User data fetched:', data);
                })
                .catch(() => {
                    setUser(null);
                    setLoading(false);
                    console.log('Failed to fetch user data');
                });
        } else {
            setLoading(false);
        }
    }, [token, user, setUser]);

    // if (loading) {
    //     console.log('Loading user data...');
    //     return <div>Loading...</div>;
    // }

    if (!token) {
        console.log('No token found, redirecting to login...');
        return <Navigate to={"/login"} replace />;
    }

    // if (user && user.tipo_usuario != role) {
    //     console.log(`User role mismatch: expected ${role}, got ${user.tipo_usuario}. Redirecting to home...`);
    //     return <Navigate to={"/"} replace />;
    // }

    // console.log('User authorized, rendering route...');
    return <Outlet />;
};
