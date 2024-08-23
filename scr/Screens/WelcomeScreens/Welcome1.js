// Welcome1.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {useFonts, Lustria_400Regular} from '@expo-google-fonts/lustria'

export default function Welcome1() {
  const [fonteLoaded] = useFonts({
    Lustria_400Regular,
  });

  if(!fonteLoaded){
    return null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
        source={require('../../Assets/welcome1.png')}
        style={{width: '100%' }}
        resizeMode='contain'/>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>BEM-VINDO AO EDUC-OFF</Text>
        <Text style={styles.text}>Sua jornada para o sucesso acadêmico começa aqui. </Text>      
        <Text style={styles.text}>Prepare-se para os vestibulares e o ENEM de forma eficaz com aulas, videoaulas, exercícios interativos e simulados. O conhecimento está ao seu alcance.Acesse aulas completas, videoaulas, exercícios interativos e simulados para praticar seus conhecimentos.</Text>  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1, 
  },

  containerLogo:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerForm:{
    flex:1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },

  title:{
    fontSize: 20,
    color: 'rgb(72, 83, 277)',
    marginTop:28,
    marginBottom:15,
    fontFamily: 'Lustria_400Regular'
  },

  text:{
    fontSize:15,
    fontWeight:'500',
    textAlign: 'justify',
    marginBottom: 4,
    fontFamily: 'Lustria_400Regular'
  }
});


