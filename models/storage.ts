import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    },
    storeCurrentUser: async function storeCurrentUser(email: string) {
        try {
            const user = {
                email: email
            };
            const jsonValue = JSON.stringify(user);

            await AsyncStorage.setItem('@user', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readCurrentUser: async function readCurrentUser(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
};

export default storage;