import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const SharedTodoModal = ({ id, title, shared_with_id, completed }) => {
    const [author, setAuthor] = useState({})
    const [sharedWith, setSharedWith] = useState({})
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
        <View>
            <Text>SharedTodoModal</Text>
        </View>
    )
}

export default SharedTodoModal

const styles = StyleSheet.create({})