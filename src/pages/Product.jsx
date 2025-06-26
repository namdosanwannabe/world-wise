import PageNav from "../components/PageNav";
import styles from "./Product.module.css";
import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <img
                    src="img-1.jpg"
                    alt="person with dog overlooking mountain with sunset"
                />
                <div>
                    <h2>About WorldWide.</h2>
                    <p>
                        WorldWise is a travel tracking app built to explore Supabase, Google OAuth, and modern React features like Context and Reducers. It uses React Router for  client-side navigation, Leaflet for interactive maps and CSS Modules for styling.
                    </p>
                    <div className={styles.links}>
                        <a
                            href='https://www.linkedin.com/in/archiecayabyabconnects/'
                            className={styles.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                        <a
                            href='https://github.com/namdosanwannabe'
                            className={styles.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Github size={16} />
                            GitHub
                        </a>
                        <a
                            href='https://www.instagram.com/achikochi_/'
                            className={styles.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Instagram size={16} />
                            Instagram
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
