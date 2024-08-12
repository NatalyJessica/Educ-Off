import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Image, Button } from 'react-native';


const subPages = [
  {name: 'Matematica', image: require('../../Assets/Matematica.png.jpg'), screen: 'MatematicaScreen'},
  {name: 'Portugues', image: require('../../Assets/Portugues.png.jpg'), screen: 'PortuguesScreen'},
  {name: 'Biologia', image: require('../../Assets/Biologia.png.jpg'), screen: 'BiologiaScreen'},
  {name: 'Simulado', image: require('../../Assets/Simulado.png.jpg'), screen: 'SimuladoScreen'},
]

export default function ContentsScreen() {

  //navegação
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
       <View style={styles.container}>
        <View style={styles.header}>
           <Text style={styles.headerText}> Materias</Text>
            {/* Adicione uma barra de progresso aqui */}
        </View>
        
          {subPages.map((subPages, index)=>(
            <TouchableOpacity
              key={index}
              style={styles.subjectContainer}
              onPress={()=> navigation.navigate(subPages.screen)}
              >
                <Image source={subPages.image} style={styles.subjectImage}/>
                <Text style={styles.subjectName}>{subPages.name}</Text>
              </TouchableOpacity>
          ))}
  
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
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
}, 
  subjectContainer: {
    backgroundColor: '#fff',
    padding: 30,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'flex-end',
    flex: 1, 
    elevation: 3,
  },
  subjectImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginTop: 10,
  },
 
});