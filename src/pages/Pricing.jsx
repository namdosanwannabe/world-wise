// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
    return (
        <main className={styles.product}>
            <PageNav />
            <section>
                <div>
                    <h2>
                        Simple pricing.
                        <br />
                        Just $9/month.
                    </h2>
                    <p>
                        Track your travels without limits. No hidden fees, no surprises—just a straightforward plan to help you stay organized and inspired.
                    </p>
                </div>
                <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
            </section>
        </main>
    );
}
