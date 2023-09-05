import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SharedTodoModal from "./SharedTodoModal"
import TodoModalContent from './TodoModalContent';


const ChechMark = ({ id, completed, toggleTodo }) => {
    const toggle = async () => {
        try {
            const response = await fetch(`http://192.168.56.1:3000/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    value: completed ? false : true
                }),
            });
            const data = await response.json();
            toggleTodo(id);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Pressable
            onPress={toggle}
            style={[styles.chechMark, { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" }]}
        />
    )
}

const Task = ({ title, id, completed, shared_with_id, toggleTodo, clearTodo }) => {
    const [isDeleteActive, setIsDeleteActive] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const sharedBottomSheetRef = useRef(null);
    const snapPointShared = ["40%"];
    const snapPointModal = ["65%"];

    const openSharedBottomSheet = () => {
        sharedBottomSheetRef.current?.present();
    };

    const presentBottomSheetModal = () => {
        bottomSheetModalRef.current?.present();
    };

    const deleteTodo = async () => {
        const response = await fetch(`http://192.168.56.1:3000/todos/${id}`, { method: "DELETE" });
        clearTodo(id);
        console.log(response.status);
    }

    return (

        <TouchableOpacity
            onLongPress={() => setIsDeleteActive(true)}
            onPress={() => setIsDeleteActive(false)}
            activeOpacity={0.8}
        >


            <View style={styles.row}>
                <ChechMark
                    clearTodo={clearTodo}
                    id={id}
                    completed={completed}
                    toggleTodo={toggleTodo} />
                <Text style={styles.text}>{title}</Text>

                {shared_with_id !== null ?
                    (<Ionicons
                        onPress={openSharedBottomSheet}
                        name="people" size={20} color="black" />) :
                    (<Feather

                        onPress={presentBottomSheetModal}
                        name="share" size={20} color="black" />)}
            </View>
            {isDeleteActive && (
                <Pressable
                    onPress={deleteTodo}
                    style={styles.deleteButton}
                >
                    <Text style={{ color: "white", fontWeight: "bold", paddingHorizontal: 5 }}>X</Text>
                </Pressable>
            )}
            <BottomSheetModal
                ref={sharedBottomSheetRef}
                snapPoints={snapPointShared}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                < SharedTodoModal
                    id={id}
                    title={title}
                    shared_with_id={shared_with_id}
                    complete={completed} />
                <TodoModalContent />
            </BottomSheetModal>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={snapPointModal}
                backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
                <TodoModalContent id={id} title={title} />
            </BottomSheetModal>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "right",
        marginVertical: 15,
    },
    chechMark: {
        height: 20,
        width: 20,
        borderRadius: 4,
        margin: 10
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        backgroundColor: "#fffdff",
        marginBottom: 10,
        borderRadius: 15,
        alignItems: "center",
        position: "relative"
    },
    deleteButton: {
        position: "absolute",
        right: -2,
        top: -5,
        backgroundColor: "red",
        borderRadius: 10
    }
});

export default Task;
