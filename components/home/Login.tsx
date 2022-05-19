import Auth from '../../interface/auth';
import { useState } from 'react';
import authModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            console.log(auth.email);

            const result = await authModel.login(auth.email, auth.password);
            console.log(result);

            if (result.type === "success") {
                setIsLoggedIn(true);
                navigation.navigate("Mina sidor", { reload: true });
            }
    
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type
            });

        } else {
            showMessage({
                message: "Saknas",
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
    );
};