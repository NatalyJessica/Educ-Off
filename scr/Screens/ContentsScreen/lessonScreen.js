import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LessonScreen = ({ route, navigation }) => {
  const { moduleName } = route.params; // Pegando o nome do módulo da navegação
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontLoaded] = useFonts({ Lustria_400Regular });

  useEffect(() => {
    fetch(`http://192.168.0.13:8080/v1/modules/${moduleName}/lesson`)
      .then(response => response.json())
      .then(data => {
        if (data.lesson_id && data.title && data.content) {
          setLesson(data);
        } else {
          setError('Atualmente não há lição disponível para este módulo.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar a lição:', error);
        setError('Houve um problema ao buscar a lição. Tente novamente mais tarde.');
        setLoading(false);
      });
  }, [moduleName]);

  const handleFinishLesson = () => {
    fetch(`http://192.168.0.13:8080/v1/modules/${lesson.lesson_id}/finish`, {
      method: 'PUT',
    })
    .then(() => {
      // Apenas exibe a mensagem de sucesso e navega para trás, sem processar a resposta
      alert('Lição concluída!');
      navigation.goBack(); // Navega para a tela anterior
    })
    .catch(error => {
      console.error('Erro ao concluir a lição:', error);
      alert('Houve um problema ao concluir a lição. Tente novamente mais tarde.');
    });
  };

  if (!fontLoaded) {
    return <Text>Carregando fonte...</Text>;
  }

  if (loading) {
    return <Text>Carregando lição...</Text>;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
          {lesson.title}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>{lesson.content}</Text>
        <Button title="Concluir Lição" onPress={handleFinishLesson} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: 'rgb(72,83,227)',
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    zIndex: 1,
    elevation: 5,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: 'Lustria_400Regular',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Lustria_400Regular',
  },
  content: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default LessonScreen;
