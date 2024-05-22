import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';


export default function MainScreen() {
  return (
   <KeyboardAwareScrollView>
       <View style={styles.container}>
        <View style={styles.modalView}>
          <Text>Pagina inicial</Text>
          <Calendar/>
        </View>
        <View>
          <Text>Andamento</Text>
        </View>
        <View>
          <Text>a fazer</Text>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
        <Icon name="home" size={35} color="black" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Icon name="book" size={35} color="black" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <Icon name="download" size={35} color="black" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="user" size={35} color="black" /> 
        </TouchableOpacity>
      </View>
    </View>
   </KeyboardAwareScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Alinha os itens ao rodapé
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os botões igualmente
    paddingHorizontal: 18, // Espaçamento horizontal
    paddingVertical: 10, // Espaçamento vertical
    backgroundColor: 'white', // Cor de fundo do container
    shadowColor: '#000', // Cor da sombra
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    shadowOffset: {
      width: 0,
      height: -2, // Ajuste para sombra ficar na parte inferior
    },
    elevation: 5, // Elevação da sombra no Android
  },

  button: {
    backgroundColor: 'white',
   
    
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius:20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
});