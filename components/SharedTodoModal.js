import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const SharedTodoModal = ({ id, title, shared_with_id, completed }) => {


    const [author, setAuthor] = useState({})
    const [sharedWith, setSharedWith] = useState({})
    const statusText = completed === 1 ? "Completa" : "Incompleta";


    console.log(sharedWith)

    useEffect(() => {
        fetchInfo()
    }, [])
    const fetchInfo = async () => {

        const response = await fetch(`http://192.168.56.1:3000/todos/shared_todos/${id}`, {

            method: "GET"
        });

        const { author, shared_with } = await response.json();

        setAuthor(author);
        setSharedWith(shared_with)

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estado</Text>
            <View style={styles.content}>
                <Text style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    marginBottom: 10,
                    color: completed === 1 ? "green" : "red"
                }}>{statusText}</Text>
                <Text style={styles.label}>Autor</Text>
                <Text style={styles.authorName}>{author.name}</Text>
                <Text style={styles.label}>Participantes</Text>
                {/* <Text style={styles.sharedWithName}>{sharedWith.name}</Text> */}
            </View>
        </View>
    )
}

export default SharedTodoModal

const styles = StyleSheet.create({
    container: {

        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 3,
        // elevation: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: "center"
    },
    content: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
    },
    authorName: {
        fontSize: 15,
        marginBottom: 10,
        color: '#444',
    },
    sharedWithName: {
        fontSize: 15,
        color: '#444',
    },
})