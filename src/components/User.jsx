import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    function handleClick() {
        signOut();
        navigate('/');
    }

    return (
        <div className={styles.user}>
            <img src={user?.avatar_url} alt={user?.full_name} referrerPolicy="no-referrer" />
            <span>Welcome, {user?.full_name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default User;