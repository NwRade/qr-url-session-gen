import { get, post } from "axios";
import { useCallback } from "react";
import toast from "react-hot-toast";
import styles from "../app.module.css";

const Menu = ({
    location,
    match: {
        params: { restaurantName },
    },
    history,
}) => {
    const validate = useCallback(
        () =>
            get(`${process.env.REACT_APP_API_URL}/new/present`, {
                withCredentials: true,
            })
                .then((res) => {
                    if (res.data.err === false)
                        toast.success(
                            `${res.data.payload.username} es en la ${res.data.payload.rest}`
                        );
                    else {
                        post(
                            `${process.env.REACT_APP_API_URL}/clearAll`,
                            {},
                            {
                                withCredentials: true,
                            }
                        )
                            .then((res) => {
                                res.status === 200 && history.push("/");
                                toast.error("this order dosent exist anymore");
                            })
                            .catch((err) => console.error(err));
                    }
                })
                .catch((err) => console.error(err)),
        [history]
    );
    const cancel = useCallback(
        () =>
            post(
                `${process.env.REACT_APP_API_URL}/clearAll`,
                {},
                {
                    withCredentials: true,
                }
            )
                .then((res) => res.status === 200 && history.push("/"))
                .catch((err) => console.error(err)),
        [history]
    );
    return (
        <div className={styles.containerCenter}>
            <div
                className={styles.centerDiv}
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                Menu for {restaurantName}
                <div
                    style={{
                        marginTop: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button
                        style={{ width: "40%", padding: "1rem" }}
                        onClick={validate}
                    >
                        validate
                    </button>
                    <button
                        style={{ width: "40%", padding: "1rem" }}
                        onClick={cancel}
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
