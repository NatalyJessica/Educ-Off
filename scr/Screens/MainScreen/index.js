import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export default function MainScreen() {

  //navegação
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.container}>
        <View>
          <Text>Caledario</Text>
        </View>
        <View>
          <Text>Andamento</Text>
        </View>
        <View>
          <Text>a fazer</Text>
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
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Profile')} >
          <Icon name="user" size={35} color="black" /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Doubts')} >
          <Icon name="comments" size={35} color="black" /> 
        </TouchableOpacity>
      </View>
    </View>
   </KeyboardAwareScrollView>
  );
}



const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

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
 
});