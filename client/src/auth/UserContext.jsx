import { createContext, useState } from "react";
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get('authUser');
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    const signIn = async (credentials) => {

        try {
        const response = await fetch("http://localhost:3000/users/auth", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.status === 200) {
            const user = await response.json();
            setAuthUser(user);
            Cookies.set("authUser", JSON.stringify(user), {expires: 1});
            return user
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error;
        } 
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn
            }
        }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;

