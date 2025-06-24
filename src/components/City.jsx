import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import flagemojiToPNG from "../utils/emojiToPng";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    const { id } = useParams();
    const { getCity, currentCity, isLoading } = useCities();
    const { city_name, emoji, date_visited, notes } = currentCity;

    useEffect(() => {
        getCity(id);
    }, [id]);

    if (isLoading) return <Spinner />

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{flagemojiToPNG(emoji)}</span> {city_name}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {city_name} on</h6>
                <p>{formatDate(date_visited || null)}</p>
            </div>

            {notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${city_name}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Check out {city_name} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <BackButton />
            </div>
        </div>
    );
}

export default City;
