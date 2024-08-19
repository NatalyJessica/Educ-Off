import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}>

       <View style={styles.mainContent}>
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
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 60, // Espaço para o rodapé
  },
  mainContent: {
    flex: 1,
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
    elevation: 3,
    justifyContent: 'flex-end',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 20,
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
});