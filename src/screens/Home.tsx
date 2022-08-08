import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from "date-fns";

export default function Home({ route, navigation }: any) {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        navigation.addListener("focus", () => {
            AsyncStorage.getItem("tasks").then((data) => {
                if (data !== null) {
                    setTaskList(JSON.parse(data))                    
                }
            })
        })
    }, [])

    const taskItemView = ({ item }: any) => {
        return (
            <View style={[styles.itemStyle, { backgroundColor: item.color }]}>
                <View style={styles.typeStyle}>
                    <Text style={{ color: 'black' }}>{item.type}</Text>
                </View>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <View style={styles.dataRow}>
                    <Ionicons name="md-calendar-outline" size={15} color="black" style={{ marginRight: 12 }} />
                    <Text>{format(new Date(item.deadline), 'MMM d, yyyy')}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Ionicons name="md-time-outline" size={15} color="black" style={{ marginRight: 12 }} />
                    <Text>{format(new Date(item.deadline), 'hh:mm a')}</Text>
                </View>
                <TouchableOpacity style={styles.editStyle}>
                    <Ionicons name="md-create-outline" size={20} color="black" style={{ margin: 12 }} />
                </TouchableOpacity>
            </View>)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.textStyle}>
                    <Text>Welcome Back</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Here's Update Today</Text>
                </View>
                {taskList.length > 0 ?
                    <FlatList
                        data={taskList}
                        renderItem={taskItemView}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, marginTop: 16 }}
                    />
                    :
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'gray', opacity: 0.5 }}>Task not fount</Text>
                    </View>
                }
                <View style={{ alignItems: 'center', }}>
                    <Pressable
                        onPress={() => navigation.navigate("create")}
                        style={styles.fabStyle}>
                        <Ionicons name="md-add-circle" size={30} color="white" />
                        <Text style={{ color: "#fff" }}>Add Task</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 16,
    },
    textStyle: {
        alignItems: 'flex-start',
        width: '100%'
    },
    fabStyle: {
        width: 110,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row'
    },
    itemStyle: {
        flex: 1,
        width: "100%",
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 16,
        marginBottom: 16,
    },
    typeStyle: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        paddingTop: 3,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#ffffff39',
    },
    titleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15
    },
    dataRow: {
        flexDirection: 'row',
        marginVertical: 5
    },
    editStyle: {
        position: 'absolute',
        right: 0,
        top: 0
    }
});