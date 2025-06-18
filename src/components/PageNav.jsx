import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo';
import Placeholder from '../../public/person-placeholder.svg'
import styles from './PageNav.module.css'
import { useAuth } from '../contexts/AuthContext';

const PageNav = () => {
    const { user } = useAuth();

    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <img src={user?.avatar_url ?? Placeholder} alt={user?.full_name} referrerPolicy="no-referrer" />

                </li>
            </ul>
        </nav>
    )
}

export default PageNav