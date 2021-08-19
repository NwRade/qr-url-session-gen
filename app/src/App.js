import { useCallback, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Menu from "./components/Menu";
import NewOrderForm from "./components/NewOrderForm";
import QRCode from "qrcode.react";
import { Toaster } from "react-hot-toast";

function App() {
    const [loc] = useState(window.location.origin);
    const [ordData, setOrdData] = useState({
        restaurant: "zaika",
        table: "1",
    });
    const onChange = useCallback(
        (e) =>
            setOrdData((d) => ({
                ...d,
                [e.target.name]: e.target.value,
            })),
        []
    );

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home onChange={onChange} ordData={ordData} loc={loc} />
                    </Route>
                    <Route path="/new" component={NewOrderForm} />
                    <Route path="/:restaurantName/menu" component={Menu} />
                </Switch>
            </Router>
            <Toaster />
        </>
    );
}

const Home = ({ ordData, onChange, loc }) => (
    <div className={styles.containerCenter}>
        <div
            className={styles.centerDiv}
            style={{
                border: "2px dashed white ",
                borderRadius: "5px",
            }}
        >
            <h1 className={styles.bigText} style={{ marginBottom: "1rem" }}>
                Click on the link below to generate new order
            </h1>
            <div className={styles.form}>
                <div className={styles.formInput}>
                    <label htmlFor="restaurant">Restaurant</label>
                    <input
                        type="text"
                        name="restaurant"
                        value={ordData.restaurant}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.formInput}>
                    <label htmlFor="table">Table</label>
                    <input
                        type="number"
                        name="table"
                        value={ordData.table}
                        onChange={onChange}
                    />
                </div>
            </div>
            <div
                style={{
                    padding: "2rem",
                    backgroundColor: "white",
                    margin: "1rem auto",
                }}
            >
                <QRCode
                    value={`${loc}/new?rest=${ordData.restaurant}&table=${ordData.table}`}
                />
            </div>
            <Link
                className={styles.link}
                to={`/new?rest=${ordData.restaurant}&table=${ordData.table}`}
            >
                {`${loc}/new?rest=${ordData.restaurant}&table=${ordData.table}`}
            </Link>
        </div>
    </div>
);
export default App;
