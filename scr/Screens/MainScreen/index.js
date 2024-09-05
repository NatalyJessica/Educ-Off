import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert, FlatList, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

const mockData = {
  '2024-09-04': [{ name: 'Fazer simulado Fuvest', status: 'A Fazer' }],
  '2024-09-14': [{ name: 'Prova', status: 'Pronto' }],
  '2024-09-16': [{ name: 'Simulado', status: 'Fazendo' }],
};

export default function MainScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState(mockData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('A Fazer');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => BackHandler.exitApp(), // Fecha o aplicativo
        },
      ]);
      return true; // Indica que o evento do botão "Voltar" foi tratado
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    const newTask = { name: newTaskName, status: newTaskStatus };
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (updatedTasks[selectedDate]) {
        updatedTasks[selectedDate].push(newTask);
      } else {
        updatedTasks[selectedDate] = [newTask];
      }
      return updatedTasks;
    });
    setModalVisible(false);
    setNewTaskName('');
    setNewTaskStatus('A Fazer');
  };

  const renderTask = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.name}</Text>
      <Text style={styles.todoDate}>{selectedDate}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Página Inicial</Text>
      </View>
      <View style={styles.container}>
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
            data={tasks[selectedDate] || []}
            renderItem={renderTask}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
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
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Adicionar Tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Tarefa"
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
            <View style={styles.modalButtons}>
              <Button title="Adicionar" onPress={handleAddTask} color="rgb(72, 83, 227)" />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="rgb(72, 83, 227)" />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgb(72, 83, 227)',
    padding: 16,
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
  },
  calendar: {
    marginVertical: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  todoContainer: {
    marginVertical: 20,
    flex: 1,
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  todoText: {
    fontSize: 16,
  },
  todoDate: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
