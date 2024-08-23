import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useFonts, Lustria_400Regular} from '@expo-google-fonts/lustria'
import { TextInput, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; 



export default function RegisterScreen() {
  const navigation = useNavigation();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senha, setSenha] = useState('');
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
          source={require('../../Assets/regrister.jpg')}
          style={styles.image}
          resizeMode='contain' />
          <TouchableOpacity
           style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white"/>
            </TouchableOpacity>
        </View>
        <View style={styles.containerForm}>
        <Text style={styles.text}>Se Cadastra-se aqui!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label='Usuario:'
            style={styles.input}
          />
           </View>
          <View style={styles.inputContainer}>
           <TextInput
            label='E-mail:'
            style={styles.input}
          />
          </View>

          <View style={styles.passwordContainer}>
          <TextInput
               placeholder='Senha:'
               secureTextEntry={!mostrarSenha}
               value={senha}
               onChangeText={setSenha}
               style={styles.passwordInput}
              
            />
              <IconButton
              icon={mostrarSenha ? 'eye-off' : 'eye'}
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={styles.eyeIcon}
              size={20}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnTxt}>Cadastrar</Text>
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
   
  },

  containerLogo: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    height: 150,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },

  input: {
    width: '100%',
    height: 50,
    fontSize: 15,
    fontFamily: 'Lustria_400Regular',
    paddingHorizontal: 15,
    fontSize:12,
    backgroundColor:'rgb(230,230,250)'
   
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    

  },

  passwordInput: {
    flex: 1,
    fontSize: 12,
    width: '100%',
    height: 50,
    fontSize: 12,
    fontFamily: 'Lustria_400Regular',
    paddingHorizontal: 8,
    backgroundColor:'rgb(230,230,250)'
  },
  eyeIcon: {
    position: 'absolute',
    right: 5,
  },

  text:{
    fontSize:15,
    fontWeight:'500',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Lustria_400Regular',
    color: 'rgb(72,83,255)'
  },

  
  btn: {
    backgroundColor: 'rgb(72,83,277)',
    borderRadius: 80,
    paddingVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginTop: 25,
    alignSelf: 'center',
  },

  btnTxt: {
    fontSize: 18,
    color: 'rgb(255,255,255)',
    fontFamily: 'Lustria_400Regular'
  },

  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  
})

