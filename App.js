import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [todos, setTodos] = useState([])
  console.log(todos, "todos todos todfos")


  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.56.1:3000/todos/2")
      console.log(response, 121213123412312)
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      console.log(err)
    }
  }
  const clearTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ?
          { ...todo, completed: todo.completed === 1 ? 0 : 1 } :
          todo)
    )

  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <SafeAreaView>
            <FlatList data={todos}
              keyExtractor={(todo) => todo.id}
              renderItem={({ item }) => (
                <Task {...item} clearTodo={clearTodo} toggleTodo={toggleTodo} />
              )}
              ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </SafeAreaView>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e4ed',
  },
  contentContainerStyle: {
    padding: 15
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  }
});
