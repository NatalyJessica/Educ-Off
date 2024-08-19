import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function DownloadScreen() {
  // Navegação
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <Text>Download</Text>
        </View>
      </KeyboardAwareScrollView>

      {/* Rodapé fixo na parte inferior */}
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o container ocupe toda a altura da tela
    justifyContent: 'flex-end', // Garante que o rodapé fique na parte inferior
  },
  scrollView: {
    flex: 1, // Garante que o KeyboardAwareScrollView ocupe o espaço restante
  },
  scrollContainer: {
    paddingBottom: 60, // Espaço para o rodapé
  },
  content: {
    flex: 1, // Garante que o conteúdo ocupe o espaço restante do scroll view
    justifyContent: 'center', // Alinha o conteúdo verticalmente no centro
    alignItems: 'center', // Alinha o conteúdo horizontalmente no centro
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
