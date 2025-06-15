import styles from "./CountryItem.module.css";
import FlagImage from '../utils/emojiToPng'

function CountryItem({ country }) {
    return (
        <li className={styles.countryItem}>
            <span>{FlagImage(country.emoji)}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
