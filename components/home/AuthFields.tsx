import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={ Base.mainPadding }>
            <Text style={Typography.h2}>{title}</Text>

            <Text style={Typography.p}>E-post</Text>
            <TextInput
                style={{ ...Forms.input }}
                selectionColor={'orange'}
                autoCorrect={false}
                clearButtonMode='always'
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                testID="email-field"
            />

            <Text style={Typography.p}>Lösenord</Text>
            <TextInput
                style={{ ...Forms.input }}
                selectionColor={'orange'}
                autoCorrect={false}
                clearButtonMode='always'
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                testID="password-field"
            />

            {title === "Registrera" && 
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => submit()}
                    accessibilityLabel={`${title} genom att trycka`}
                    >
                    <Text style={Base.loginText}>Registrera</Text>
                </TouchableOpacity>}

            {title === "Logga in" &&
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => submit()}
                    accessibilityLabel={`${title} genom att trycka`}
                    >
                    <Text style={Base.loginText}>Logga in</Text>
                </TouchableOpacity>}
            
            {title === "Logga in" &&
                <TouchableOpacity
                    style={Base.loginScreenButton}
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                    accessibilityLabel={`${title} genom att trycka`}
                    >
                    <Text style={Base.loginText}>Registrera ny användare</Text>
                </TouchableOpacity>}
        </View>
    );
};