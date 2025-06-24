import styles from './CityItem.module.css'
import FlagImage from '../utils/emojiToPng'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { city_name, emoji, date_visited, id, lat, lng } = city;
    const { currentCity, deleteCity } = useCities();

    function handleClick(e) {
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li >
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={styles.emoji}>{FlagImage(emoji)}</span>
                <h3 className={styles.name}>{city_name}</h3>
                <time className={styles.date}>({formatDate(date_visited)})</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem