import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import { TextInput, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [fonteLoaded] = useFonts({
    Lustria_400Regular,
  });

  if (!fonteLoaded) {
    return null;
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.30:8080/v1/login', { // URL da API de login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso no login - redirecionar para a tela principal
        navigation.navigate('Main');
      } else {
        // Exibir mensagem de erro
        setMensagemErro(data.message || 'E-mail ou senha inválidos');
      }
    } catch (error) {
      // Exibir mensagem de erro em caso de falha na requisição
      setMensagemErro('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              source={require('../../Assets/welcome1.png')}
              style={styles.image}
              resizeMode='cover'
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.containerForm}>
            <Text style={styles.text}>Faça seu login!</Text>

            <View style={styles.inputContainer}>
              <TextInput
                label='E-mail'
                style={styles.input}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder='Senha'
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
                style={styles.passwordInput}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
              />
              <IconButton
                icon={mostrarSenha ? 'eye-off' : 'eye'}
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.eyeIcon}
                size={20}
              />
            </View>

            {mensagemErro ? (
              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>{mensagemErro}</Text>
              </View>
            ) : null}

            <View>
              <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnTxt}>Logar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
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
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  container: {
    padding: 10,
  },
  containerLogo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderColor: 'rgb(72,83,255)',
    borderWidth: 0,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  containerForm: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    fontFamily: 'Lustria_400Regular',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: '#FFF',
    fontFamily: 'Lustria_400Regular',
    fontSize: 14,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Lustria_400Regular',
    color: 'rgb(72,83,255)',
  },
  btnLogin: {
    backgroundColor: 'rgb(72,83,255)',
    borderRadius: 25,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnRegister: {
    backgroundColor: 'rgb(100,150,255)', // Cor diferente para o botão de cadastro
    borderRadius: 25,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Lustria_400Regular',
  },
  alertContainer: {
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fdd',
    marginBottom: 15,
  },
  alertText: {
    color: '#d9534f',
    fontFamily: 'Lustria_400Regular',
    fontSize: 14,
  },
});
