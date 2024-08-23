import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Calendario from './Calendario'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {

  //navegação
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Página Inicial</Text>
          </View>

          <Calendario></Calendario>

        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>Andamento</Text>
          {/* Adicione uma barra de progresso aqui */}
        </View>

        <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>A FAZER</Text>
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>Fazer simulado Fuvest</Text>
          <Text style={styles.todoDate}>21 JUNHO 2023</Text>
        </View>
      </View>
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>A FAZER</Text>
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>Fazer simulado Fuvest</Text>
          <Text style={styles.todoDate}>21 JUNHO 2023</Text>
        </View>
      </View>
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>A FAZER</Text>
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>Fazer simulado Fuvest</Text>
          <Text style={styles.todoDate}>21 JUNHO 2023</Text>
        </View>
      </View>
    </View>
      </KeyboardAwareScrollView>
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
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Profile')} >
          <Icon name="user" size={35} color="black" /> 
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    
  );
}



const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
  },
  
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-end', // Alinha os itens ao rodapé
    backgroundColor: '#f0f0f0',
  },

  mainContent: {
    flex: 1,
    paddingBottom: 60, // Espaçamento para evitar sobreposição com o rodapé
  },

   buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os botões igualmente
    paddingHorizontal: 18, // Espaçamento horizontal
    paddingVertical: 12, // Espaçamento vertical
    backgroundColor: 'white', // Cor de fundo do container
    shadowColor: '#000', // Cor da sombra
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    shadowOffset: {
      width: 0,
      height: -2, // Ajuste para sombra ficar na parte inferior
    },
    elevation: 5, // Elevação da sombra no Android
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
   
    
  },
  header: {
    backgroundColor: 'rgb(72,83,227)',
    padding: 8,
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  percentageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white'
  },
  percentageText: {
    fontSize: 18,
    backgroundColor: 'white'
  },
  todoContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    
  },
  todoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  todoText: {
    fontSize: 16,
  },
  todoDate: {
    fontSize: 14,
    color: 'gray',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ddd',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
  },
});