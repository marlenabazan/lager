import { useState } from "react";

import Auth from "../../interfaces/auth";
import AuthModel from "../../models/auth";
import AuthFields from "./AuthFields";

import { showMessage } from "react-native-flash-message";

export default function Login({ navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin () {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password)
            // setIsLoggedIn(true);
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
    
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
        } else {
            showMessage({
                message: "Något saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields 
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    )
};