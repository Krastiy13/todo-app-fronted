import { Alert, StyleSheet, Text, TextInput, View, Button, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const TodoModalContent = ({ id }) => {
    const [email, setEmail] = useState('');
    const [focus, setFocus] = useState(false);

    console.log(id, 78754545787)

    const handelSubmite = async () => {
        const response = await fetch("http://192.168.56.1:3000/todos/shared_todos", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                todo_id: id,
                user_id: 1,
                email: '"' + email.trim() + '"'
            })
        });

        const data = await response.json();
        console.log(data);
        // Ocultar teclado del usuario
        Keyboard.dismiss();

        setEmail('');
        setFocus(false);

        Alert.alert(
            `Felicitaciones, Has compartido ${title} con ${email}`,
            [{ text: "Okay" }]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compartir tu Tarea</Text>
            <Text style={styles.description}>Introduce el email del usuario al que quieres compartir tu tarea y estar sincronizados con sus metas.</Text>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text.toLowerCase())}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardType='email-address'
                style={[styles.input, focus && { borderWidth: 2, borderColor: "blue" }]}
                placeholder='Ingresa el correo del destinatario'
            />
            <TouchableOpacity
                onPress={handelSubmite}
                title="Compartir"
                disabled={email.length === 0}
                style={[
                    styles.buttonContainer,
                    email.length === 0 ? styles.disabledButton : null
                ]}

            >
                <Text style={styles.buttonText}>Compartir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'start',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: 'gray',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        borderRadius: 15
    },
    buttonContainer: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: "gray"
    }
});

export default TodoModalContent;
