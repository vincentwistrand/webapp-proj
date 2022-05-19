import Auth from '../../interface/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from "react-native-flash-message";

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    const hasNumber = /\d/;

    async function Register() {
        if (auth.email && auth.password) {

            if (!auth.email.includes('@' && '.')) {
                    showMessage({
                    message: 'En e-postadress måste innehålla @ och .',
                    type: "warning"
                    });
                    return;
            }

            if (!/\d/.test(auth.password) || (auth.password.length < 5)) {
                showMessage({
                message: 'Lösenordet måste innehålla siffror och bokstäver och ska vara längre än 5 tecken',
                type: "warning"
                });
                return;
            
        }

            const result = await AuthModel.register(auth.email, auth.password);
            console.log(result.message);

            if (result.message === "User successfully registered.") {
                //setIsLoggedIn(true);
                navigation.navigate("Mina sidor", { reload: true });
            }

            if (result.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email, users.apiKey") {
                showMessage({
                    message: result.title,
                    description: "Användaren existerar redan",
                    type: result.type
                });
            } else {
                showMessage({
                    message: result.title,
                    description: result.message,
                    type: result.type
                });
            }

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
            submit={Register}
            title="Registrera"
            navigation={navigation}
        />
    );
};