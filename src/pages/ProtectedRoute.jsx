import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user, navigate])

    return user ? children : null
}

