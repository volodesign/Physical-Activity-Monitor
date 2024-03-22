import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const UserContext = createContext();

function UserContextProvider(props) {
    const { getLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (getLoggedIn) {
            fetchData();
        }
    }, [getLoggedIn]);

    async function fetchData() {
        try {
            const userDataRes = await axios.get("http://localhost:3232/api/userdata");
            setUser(userDataRes.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    return (
        <UserContext.Provider value={{ user, fetchData }}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
