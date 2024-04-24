import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import CustomButton from './CustomButton';

const Item = ({id, title, completed}) => (
    <View >
      <Text>    {id}              {completed ?  "Yes" : "No" }                        {title}</Text>
    </View>
);

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [itemID, setItemID] = useState(1);
    const [taskName, setTaskName] = useState();
    const [ID, setID] = useState();

    //the following function is for when users want to add a task, and it will increment id count
    //whenever a task is added, so each taskid is unique
    const addTask = () => {
        if (!taskName) {
            alert('Cannot add a task without a name!')
            return; //don't do anything if title is empty
        }
        setTasks(prevState => [
            ...prevState,
            {id: itemID, title: taskName, completed: false}
        ]);
        setItemID(n => n+1);
        setTaskName('')
        // alert('Task Added Successfully!')
    };

    //the following function will toggle the completed field value
    const toggleTask = () => {
        const id = parseInt(ID, 10); //convert to number
        if (isNaN(id)) return; // if id is not a number or out of range
        // let completeNOT = (tasks[id].completed === 'False') ? 'True' : 'False';
        setTasks( prevState => prevState.map(task => 
            task.id === id ? {...task, completed: !task.completed} : task
          ));
    }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Task Manager</Text>

        <View style={styles.inputArea}>
            <Text style={styles.inputText}>Task Name: </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={setTaskName}
                value={taskName}
                placeholder="Enter Task Name"
            />
        </View>

        <CustomButton onPress={addTask} title="Add Task" color="grey" />
        
        <View style={{flexDirection:'row'}}>
            <Text style={styles.inputText}>Task ID: </Text>
            <TextInput 
                style={styles.textInput}
                onChangeText={setID}
                value={ID}
                placeholder='ID'
            />
        </View>
        <CustomButton onPress={toggleTask} title="Toggle Task" color="grey" />
        
        <Text>Number of Tasks: {itemID-1}</Text>
        <Text style={{fontWeight:'bold'}}>Task ID      Completed?       Task Name</Text>
        <FlatList 
            style={styles.listType}
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Item id={item.id} title={item.title} completed={item.completed}/>}
        />


    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: '#ffd'
    },  
    textInput: {
        height: 40,
        // margin: 12,
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 1,
        padding: 10,
    },
    header: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 30,
        color: 'blue',
        margin: 20,
    },
    inputText: {
        marginTop: 25,
        marginBottom: 25,
        fontSize: 15,
    },
    inputArea: {
        flexDirection: 'row'
    },
    listType: {
        // margin: 15,
        // padding: 5,
    },
  });

export default TaskManager;