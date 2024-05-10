// Welcome2.js
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import {useFonts, Lustria_400Regular} from '@expo-google-fonts/lustria'

export default function Welcome2() {
  const navigation = useNavigation();
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
        source={require('../../Assets/welcome2.jpg')}
        style={styles.image}
        resizeMode='contain'/> 
        </View>
        <View style={styles.containerForm}>
        <Text style={styles.title}>ACESSE MESMO OFFILINE</Text>
        <Text style={styles.text}>Com o Educ-Off, você pode estudar mesmo em locais sem acesso à internet. Nosso sistema funciona offline, permitindo que você aproveite ao máximo seu tempo de estudo, seja em casa, em um café aconchegante, no onibus  ou em uma biblioteca silenciosa. A educação está ao alcance de todos.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnTxt}>Começar</Text>
        </TouchableOpacity>
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

  image:{
    height: 600,
    width: 400,
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
    textAlign: 'center',
    fontFamily: 'Lustria_400Regular'
  },

  text:{
    fontSize:15,
    fontWeight:'500',
    textAlign: 'justify',
    marginBottom: 4,
    fontFamily: 'Lustria_400Regular'
  },

  btn:{
    backgroundColor: 'rgb(72,83,277)',
    borderRadius: 80,
    paddingVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginTop: 24,
    alignSelf: 'center',
  },

  btnTxt:{
    fontSize: 18,
    color: 'rgb(255,255,255)',
    fontFamily: 'Lustria_400Regular'
  }

});
