import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const TodoModalContent = () => {
    const [email, setEmail] = useState()
    const [focus, setFocus] = useState(false)
    const handelSubmite = async () => {
        const response = await fetch("http://http://192.168.56.1:3000/todos/shared_todos", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                todo_id: id,
                user_id: 1,
                email: email
            })
        });
        const data = await response.json();
        console.log(data);
        //ocultar teclado del usuario cuando acabde la consulta 
        Keyboard.dismiss();
        setEmail("");
        setFocus(false);
        Alert.alert(
            "Felictaciones  , Has compartido ${title} con ${email}",
            [{ text: "Okay" }]
        );

    };

    return (
        <View>
            <Text>TodoModalContent</Text>
        </View>
    )
}

export default TodoModalContent

const styles = StyleSheet.create({})