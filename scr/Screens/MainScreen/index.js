import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, FlatList, Modal, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

const API_URL = 'http://192.168.0.30:8080/v1/tasks'; // Substitua pela URL do seu endpoint

export default function MainScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('A Fazer');
  const [updateStatus, setUpdateStatus] = useState('A Fazer');
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateTaskName, setUpdateTaskName] = useState('');
  const [updateTaskStatus, setUpdateTaskStatus] = useState('A Fazer');

  useEffect(() => {
    fetchTasks();

    const backAction = () => {
      Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Erro ao buscar tarefas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    fetchTasks();
    setModalVisible(true);
  };

  const handleAddTask = async () => {
    try {
      const newTask = { 
        description: newTaskName, 
        status: newTaskStatus, 
        date: selectedDate 
      };
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
 
      if (response.ok) {
        fetchTasks();
        setModalVisible(false);
        setNewTaskName('');
        setNewTaskStatus('A Fazer');
      } else {
        console.error('Erro ao adicionar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleUpdateTask = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
 
      if (response.ok) {
        fetchTasks();
        setUpdateModalVisible(false);
      } else {
        console.error('Erro ao atualizar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Erro ao deletar tarefa:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleOpenUpdateModal = (task) => {
    setSelectedTask(task.task_id);
    setUpdateTaskName(task.description);
    setUpdateTaskStatus(task.status);
    setUpdateModalVisible(true);
  };

  const renderTask = ({ item }) => (
    <View style={[styles.todoItem, { backgroundColor: getStatusColor(item.status) }]}>
      <View style={styles.iconContainer}>
        {getStatusIcon(item.status)}
      </View>
      <View style={styles.todoContent}>
        <Text style={styles.todoText}>{item.description}</Text>
        <Text style={styles.todoDate}>{item.date || selectedDate}</Text>
      </View>
      <TouchableOpacity onPress={() => handleOpenUpdateModal(item)} style={styles.iconButton}>
        <Icon name="pencil" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTask(item.task_id)} style={styles.iconButton}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'A Fazer':
        return '#f39c12'; 
      case 'Fazendo':
        return '#3498db'; 
      case 'Pronto':
        return '#2ecc71'; 
      default:
        return '#ffffff'; 
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'A Fazer':
        return <Icon name="hourglass-half" size={20} color="white" />;
      case 'Fazendo':
        return <Icon name="spinner" size={20} color="white" />;
      case 'Pronto':
        return <Icon name="check-circle" size={20} color="white" />;
      default:
        return <Icon name="question-circle" size={20} color="white" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Página Inicial</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
          style={styles.calendar}
        />
        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>Tarefas</Text>
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.task_id.toString()}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Icon name="home" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contents')}>
          <Icon name="book" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Download')}>
          <Icon name="download" size={35} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição da Tarefa"
              value={newTaskName}
              onChangeText={setNewTaskName}
            />
            <Picker
              selectedValue={newTaskStatus}
              style={styles.picker}
              onValueChange={(itemValue) => setNewTaskStatus(itemValue)}
            >
              <Picker.Item label="A Fazer" value="A Fazer" />
              <Picker.Item label="Fazendo" value="Fazendo" />
              <Picker.Item label="Pronto" value="Pronto" />
            </Picker>
            <Button title="Adicionar Tarefa" onPress={handleAddTask} />
            <Button title="Fechar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição da Tarefa"
              value={updateTaskName}
              onChangeText={setUpdateTaskName}
            />
            <Picker
              selectedValue={updateTaskStatus}
              style={styles.picker}
              onValueChange={(itemValue) => setUpdateTaskStatus(itemValue)}
            >
              <Picker.Item label="A Fazer" value="A Fazer" />
              <Picker.Item label="Fazendo" value="Fazendo" />
              <Picker.Item label="Pronto" value="Pronto" />
            </Picker>
            <Button
              title="Atualizar Tarefa"
              onPress={() => handleUpdateTask(selectedTask, updateTaskStatus)}
            />
            <Button title="Fechar" onPress={() => setUpdateModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
   backgroundColor: 'rgb(72,83,227)',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoContainer: {
    padding: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  todoDate: {
    fontSize: 14,
    color: '#666',
  },
  iconButton: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  button: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});
