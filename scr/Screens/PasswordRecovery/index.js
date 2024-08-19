import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput,  } from 'react-native-paper'
import {useFonts, Lustria_400Regular} from '@expo-google-fonts/lustria'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function PasswordRecovery() {
  const [fonteLoaded] = useFonts({
    Lustria_400Regular,
  });

  if(!fonteLoaded){
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
          source={require('../../Assets/senha.png')}
          style={styles.image}
          resizeMode='contain' />
        </View>
        <View style={styles.containerForm}>
          <Text style={styles.text}>Digite seu Email para recueprar a senha:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label='E-mail:'
            style={styles.input}
          />
          </View>
          <View>
            <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnTxt}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
        </KeyboardAwareScrollView>
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
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    height: 400,
    width: 600,
  },

  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: '5%', // Adiciona espaçamento superior
  },

  
  inputContainer: {
    
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  input: {
    width: '100%',
    height: 50,
    fontSize: 12,
    fontFamily: 'Lustria_400Regular',
    paddingHorizontal: 15,
    fontSize:12,
    backgroundColor:'rgb(230,230,250)'
   
  },

  text:{
    fontSize:16,
    fontWeight:'500',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Lustria_400Regular',
    color: 'rgb(72,83,255)'
  },

  
  btn:{
    backgroundColor: 'rgb(72,83,277)',
    borderRadius: 80,
    paddingVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },

  btnTxt:{
    fontSize: 18,
    color: 'rgb(255,255,255)',
    fontFamily: 'Lustria_400Regular'
  }
  
})
