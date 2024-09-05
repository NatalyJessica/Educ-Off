import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  // Navegação
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Perfil</Text>
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
            <Text style={styles.optionButtonText}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
            <Text style={styles.optionButtonText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
            <Text style={styles.optionButtonText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => {}}>
            <Text style={styles.optionButtonText}>Sobre Nós</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.optionButtonText}>Sair</Text>
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: 'rgb(72,83,227)',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flex: 1,
    padding: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  optionButtonText: {
    fontSize: 18,
    color: 'rgb(72,83,227)',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  button: {
    alignItems: 'center',
  },
});
