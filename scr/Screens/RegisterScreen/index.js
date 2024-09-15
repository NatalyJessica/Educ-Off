import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import { TextInput, IconButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Hook para gerenciar os inputs
const useForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
  };
};

export default function RegisterScreen() {
  const navigation = useNavigation();
  const {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
  } = useForm();

  const [fontLoaded] = useFonts({
    Lustria_400Regular,
  });

  if (!fontLoaded) {
    return null;
  }
  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.13:8080/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigation.navigate('Main');
      } else {
        if (data.error === 'email already exists') {
          alert('O e-mail já está em uso. Tente outro e-mail.');
        } else {
          alert(data.message || 'Erro ao tentar cadastrar. Tente novamente mais tarde.');
        }
      }
    } catch (error) {
      alert('Erro ao tentar cadastrar. Tente novamente mais tarde.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image
              source={require('../../Assets/regrister.jpg')}
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
            <Text style={styles.text}>Cadastre-se aqui!</Text>

            <View style={styles.inputContainer}>
              <TextInput
                label='Nome'
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label='Sobrenome'
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label='E-mail'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder='Senha'
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                mode='outlined'
                theme={{ colors: { primary: 'rgb(72,83,255)' } }}
              />
              <IconButton
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                size={20}
              />
            </View>

            <View>
              <TouchableOpacity style={styles.btn} onPress={handleRegister}>
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
    justifyContent: 'flex-start', // Alinha ao topo
  },
  container: {
    padding: 10, // Reduzido para 10
  },
  containerLogo: {
    alignItems: 'center',
    marginBottom: 10, // Reduzido para 10
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderColor: 'rgb(72,83,255)',
    borderWidth: 2,
  },
  containerForm: {
    flexGrow: 1, // Adicionado para expandir
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
    marginBottom: 20, // Reduzido para 20
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
  btn: {
    backgroundColor: 'rgb(72,83,255)',
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
