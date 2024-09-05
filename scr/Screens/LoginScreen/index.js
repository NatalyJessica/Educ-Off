import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import { TextInput, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen() {
  //testar login
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  //navegação
  const navigation = useNavigation();
  //visibilidade da senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  //fonte dos text
  const [fonteLoaded] = useFonts({
    Lustria_400Regular,
  });
  if (!fonteLoaded) {
    return null;
  };

  // Função para lidar com a tentativa de login
  const handleLogin = async () => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Se o login for bem-sucedido, navegue para a tela principal
        navigation.navigate('Main');
      } else {
        // Se houver algum erro, exibir a mensagem retornada pela API
        setMensagemErro(data.message || 'E-mail ou senha inválidos');
      }
    } catch (error) {
      // Tratar erros de rede ou outros
      setMensagemErro('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
        source={require('../../Assets/login.png')}
        style={styles.containerLogo}
        resizeMode='contain'/>
      </View>
      <View style={styles.containerForm}>
        <View>
          <TextInput
          placeholder='E-mail:'
          value={email}
          onChangeText={setEmail}
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
        <View style={styles.alertContainer}>
        {mensagemErro ? (<View style={styles.alertContainer}>
              <Text style={styles.alertText}>{mensagemErro}</Text>
              </View>) : null}
        </View>
         
        <TouchableOpacity style={styles.btnEsq} onPress={() => navigation.navigate('Recovery')}>
            <Text style={styles.textEsq}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('Main')}>
              <Text style={styles.btnTxt}>Logar</Text>
              </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.btnTxt} >Cadastrar</Text>
                </TouchableOpacity>
            </View>
            
     
      </View>
    </View>
    </KeyboardAwareScrollView>
    </SafeAreaView>
  )
   
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },

  scrollContainer: {
    flexGrow: 1,
  },

  containerLogo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  image: {
    height: 50,
    width: 100,
  },

  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: '5%', // Adiciona espaçamento superior
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
   

  },
  passwordInput: {
    flex: 1,
    width: '100%',
    height: 50,
    fontSize: 12,
    fontFamily: 'Lustria_400Regular',
    paddingHorizontal: 8,
    backgroundColor:'rgb(230,230,250)',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 5,
  },

  input:{
    width: '100%',
    height: 50,
    fontSize: 12,
    fontFamily: 'Lustria_400Regular',
    paddingHorizontal: 15,
    backgroundColor:'rgb(230,230,250)'
  },

   
  btns: {
    backgroundColor: 'rgb(72,83,277)',
    borderRadius: 80,
    paddingVertical: 1,
    width: '70%',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',

  },

  btnTxt: {
    fontSize: 18,
    color: 'rgb(255,255,255)',
    fontFamily: 'Lustria_400Regular'
  },

  btnEsq:{
  marginBottom:25,
  alignItems: 'flex-end',
  },

  textEsq:{
    fontSize: 15,
    fontWeight:'500',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Lustria_400Regular',
    color: 'rgb(72,83,255)'
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  
  alertContainer: {
    borderRadius: 4, // Raio da borda do alerta de erro
    paddingHorizontal: 15, // Preenchimento horizontal do alerta de erro
    paddingVertical: 10, // Preenchimento vertical do alerta de erro

  },
  alertText: {
    color: 'red', // Cor do texto do alerta de erro
    fontFamily: 'Lustria_400Regular',
    fontSize: 14, // Tamanho da fonte do texto do alerta de erro
  },

});
