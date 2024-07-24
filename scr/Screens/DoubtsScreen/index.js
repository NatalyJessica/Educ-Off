import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet,Image, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



export default function DoubtsScreen() {

  //navegação
  const navigation = useNavigation();

  

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Duvidas</Text>
        </View>
        <View style={styles.containerLogo}>
            <Image
                source={require('../../Assets/duvidas.png')}
                style={styles.containerLogo}
                resizeMode='contain'/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua pergunta aqui..."
          />
          
          <TouchableOpacity style={styles.sendButton} >
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
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
      backgroundColor: '#f0f0f0',
    },
  
    container: {
      flex: 1,
      justifyContent: 'space-between', // Distribui espaço entre os elementos
    },
  
    header: {
      marginTop: 20,
      alignItems: 'center',
    },
  
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  
    containerLogo: {
      alignItems: 'center',
      marginTop: 20,
    },
  
    image: {
      height: 200,
      width: 200,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },

    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    
    sendButton: {
        marginLeft: 10,
        backgroundColor:'rgb(72,83,277)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    
    sendButtonText: {
        color: 'black',
        fontWeight: 'bold',
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