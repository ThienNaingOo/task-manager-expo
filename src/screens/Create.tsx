import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Line from "../components/Line";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

const Create = ({ route, navigation }: any) => {
    const [colors, setColors] = useState([
        { name: 'yellow', checked: true },
        { name: 'lightgreen', checked: false },
        { name: 'deepskyblue', checked: false },
        { name: 'cornflowerblue', checked: false },
        { name: 'crimson', checked: false },
        { name: 'orange', checked: false },
    ])
    const [type, setType] = useState([
        { name: 'Basic', checked: true },
        { name: 'Urgent', checked: false },
        { name: 'Important', checked: false },
    ])
    const [date, setDate] = useState(new Date(Date.now()))
    const [title, setTitle] = useState('')

    const clickColor = (i: any) => {
        let items = [...colors];
        items.map((item, index) => {
            (index === i) ? item.checked = true : item.checked = false
        })
        setColors(items)
    }

    const clickType = (i: any) => {
        let types = [...type];
        types.map((item, index) => {
            (index === i) ? item.checked = true : item.checked = false
        })
        setType(types)
    }

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showDatetime = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const onChangeText = (event: any) => setTitle(event);

    const onSaveTask = () => {        
        (title !== null) ? (
            AsyncStorage.getItem("tasks").then((data) => {
                if (data == null) {
                    let taskItem = [{
                        id: 1000,
                        color: colors.filter((item) => item.checked)[0].name,
                        deadline: date.toString(),
                        title: title,
                        type: type.filter((item) => item.checked)[0].name
                    }]
                    AsyncStorage.setItem("tasks", JSON.stringify(taskItem))
                } else {
                    let datas = JSON.parse(data);                    
                    let taskItem = [{
                        id: datas[datas.length - 1].id + 1,
                        color: colors.filter((item) => item.checked)[0].name,
                        deadline: date.toString(),
                        title: title,
                        type: type.filter((item) => item.checked)[0].name
                    }]
                    AsyncStorage.setItem("tasks", JSON.stringify([...datas, ...taskItem])).then(() => {
                        alert("Your task is successfully saved.")
                        navigation.goBack()
                    })
                }
            })
        ) : alert("Title can't be NULL!!!")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ color: 'gray', marginVertical: 5 }}>Task Color</Text>
            <View style={styles.colorRow}>
                {
                    colors.map((item, index) => (
                        <TouchableOpacity key={index} style={[styles.colorStyle, { backgroundColor: item.name }, item.checked && { borderWidth: 1 }]} onPress={() => clickColor(index)} />
                    ))
                }
            </View>
            <Line />
            <Text style={{ color: 'gray', marginVertical: 5 }}>Task Deadline</Text>
            <Pressable onPress={showDatetime}><Text style={{ fontSize: 17, fontWeight: 'bold' }}>{format(date, 'MMM d, yyyy, hh:mm b')}</Text></Pressable>
            <Line />
            <Text style={{ color: 'gray', marginVertical: 5 }}>Task Title</Text>
            <TextInput style={styles.input} onChangeText={onChangeText} value={title} placeholder="Enter Task Title" />
            <Line />
            <View style={styles.typeRow}>
                {
                    type.map((item, index) => (
                        <TouchableOpacity key={index} style={[styles.typeStyle, item.checked && { backgroundColor: 'black' }]} onPress={() => clickType(index)}>
                            <Text style={item.checked ? { color: 'white' } : { color: 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={styles.saveRow}>
                <TouchableOpacity style={styles.submitButtonStyle} onPress={onSaveTask}>
                    <Text style={{ color: 'white' }}>Save Task</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    colorRow: {
        width: '100%',
        flexDirection: 'row',
    },
    colorStyle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 8,
    },
    input: {
        height: 40,
        padding: 0,
    },
    typeRow: {
        flexDirection: 'row'
    },
    typeStyle: {
        width: 110,
        height: 40,
        marginRight: 15,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    submitButtonStyle: {
        width: 180,
        height: 40,
        marginRight: 15,
        borderRadius: 30,
        backgroundColor: '#000',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    saveRow: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 200,
        width: '100%'
    }
})

export default Create