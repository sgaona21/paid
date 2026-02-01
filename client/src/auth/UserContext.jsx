import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null)

    const signIn = async (credentials) => {
        const API_BASE = import.meta.env.VITE_API_BASE_URL;

        try {
        const response = await fetch(`${API_BASE}/users/auth`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (response.status === 200) {
            const user = await response.json();
            setCurrentUser(user);
            console.log("here is the USER:", user)
            
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
            currentUser,
            actions: {
                signIn,
                setCurrentUser
            }
        }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;

