import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../app.module.css";
import { post } from "axios";

const NewOrderForm = ({ location }) => {
    const [query, setQuery] = useState({});
    const history = useHistory();
    useEffect(() => {
        const data = {};
        location.search
            .replace("?", "")
            .split("&")
            .forEach((d) => {
                const temp = d.split("=");
                data[temp[0]] = temp[1];
            });
        setQuery(data);
    }, [location.search]);
    const [userData, setUserData] = useState({
        username: "bad boy shah",
        phoneNumber: "7001940069",
    });
    const onChange = useCallback(
        (e) =>
            setUserData((d) => ({
                ...d,
                [e.target.name]: e.target.value,
            })),
        []
    );
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            post(
                `${process.env.REACT_APP_API_URL}/new`,
                {
                    ...query,
                    ...userData,
                },
                { withCredentials: true }
            ).then(
                (res) =>
                    res.status === 200 && history.push(`/${query.rest}/menu`)
            );
        },
        [userData, query, history]
    );

    return (
        <div className={styles.containerCenter}>
            <div className={styles.centerDiv}>
                <form
                    className={styles.form}
                    onSubmit={onSubmit}
                    style={{
                        border: "2px dashed white ",
                        borderRadius: "5px",
                        paddingBottom: "1rem",
                    }}
                >
                    <div className={styles.formInput}>
                        <label htmlFor="username">username</label>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.formInput}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            marginTop: "1rem",
                            padding: ".5rem",
                            borderRadius: "5px",
                            outline: "none",
                            border: "1px solid white",
                            cursor: "pointer",
                        }}
                    >
                        GET TO MENU
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewOrderForm;
