import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

import { showMessage } from "react-native-flash-message";

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltig e-mail",
                description: "Email måste vara i formen xxx@xxx.xx",
                type: "warning"
            });
        }
    }

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/

        // ^                 : Start
        // (?=.*\d)          : Digits
        // (?=.*[a-z])       : Lower letters
        // (?=.*[A-Z])       : Upper letters
        // (?=.*[!\.-])      : Special characters
        // (?=.{4,})         : Length
        // $

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltig lösenord",
                description: "Lösenordet måste innehålla:\n* minst 4 tecken\n* små och stora bokstäver\n* minst en siffra\n* minst ett speciell tecken",
                type: "warning"
            });
        }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validateEmail(content)
                    setAuth({ ...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="email-field"
            />

            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />

            <Button
                title={title}
                onPress={() => {
                    submit(); // doLogin anropas
                }}
            />

            {
                title == "Logga in" &&
                    <Button
                        title="Registrera"
                        onPress={() => {
                            navigation.navigate("Register")
                        }}
                    />
            }
        </View>
    )

};