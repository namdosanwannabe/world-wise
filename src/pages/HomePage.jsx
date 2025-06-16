import { Link } from "react-router-dom";
import PageNav from '../components/PageNav';
import styles from "./Homepage.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function Homepage() {

    const { session, signOut, signInWithGoogle } = useAuth();

    return (
        <main className={styles.homepage}>
            <PageNav />

            <section>
                <h1>
                    You travel the world.
                    <br />
                    WorldWise keeps track of your adventures.
                </h1>
                <h2>
                    A world map that tracks your footsteps into every city you can think
                    of. Never forget your wonderful experiences, and show your friends how
                    you have wandered the world.
                </h2>
                <Link to='/login' className="cta">Start tracking now</Link>
                <div>
                    {!session ? (
                        <button onClick={signInWithGoogle} style={{ padding: '10px 20px', fontSize: '16px' }}>
                            Sign in with Google
                        </button>
                    ) : (
                        <>
                            <p>Welcome, {session.user.email}</p>
                            <button onClick={signOut} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '10px' }}>
                                Sign out
                            </button>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
