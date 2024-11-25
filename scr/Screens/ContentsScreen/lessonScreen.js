import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import Icon from 'react-native-vector-icons/MaterialIcons';
const LessonScreen = ({ route, navigation }) => {
  const { moduleName } = route.params;
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontLoaded] = useFonts({ Lustria_400Regular });

  useEffect(() => {
    fetch(`http://localhost:8080/v1/modules/${moduleName}/lesson`)
      .then(response => response.json())
      .then(data => {
        if (data.lesson_id && data.title && data.content) {
          setLesson(data);
          fetchQuestions(data.lesson_id);
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

  const fetchQuestions = (lessonId) => {
    fetch(`http://localhost:8080/v1/lessons/${lessonId}/questions`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('Erro ao buscar as questões:', error);
        Alert.alert('Erro', 'Não foi possível carregar os exercícios.');
      });
  };
  const handleAnswer = (selectedOption) => {
    const current = questions[currentQuestion];
    if (selectedOption === current.right_option) {
      Alert.alert('Resposta Correta!', 'Você acertou a questão.');
    } else {
      Alert.alert('Resposta Errada', 'Tente novamente.');
    }
  
    // Apenas avançar para a próxima questão se não estiver na última
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  

  const handleFinishLesson = () => {
    fetch(`http://localhost:8080/v1/modules/${lesson.lesson_id}/finish`, {
      method: 'PUT',
    })
      .then(() => {
        alert('Lição concluída!');
        navigation.goBack();
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
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
          {lesson.title}
        </Text>
      </View>
  
      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Exibe o conteúdo da lição */}
        <Text style={styles.text}>{lesson.content}</Text>
  
        {/* Verifica se há questões disponíveis */}
        {questions.length > 0 ? (
          <View>
            {/* Mostra apenas a questão atual */}
            <Text style={styles.text}>{questions[currentQuestion].question_text}</Text>
  
            {/* Renderiza as opções da questão atual */}
            {['option_a', 'option_b', 'option_c', 'option_d'].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(questions[currentQuestion][option])} // Corrigido para passar o texto da opção
              >
                <Text style={styles.optionText}>
                  {`${String.fromCharCode(65 + index)})`} {questions[currentQuestion][option]}
                </Text>
              </TouchableOpacity>
            ))}
  
            {/* Exibe o botão "Concluir Lição" apenas na última questão */}
            {currentQuestion === questions.length - 1 && (
              <Button title="Concluir Lição" onPress={handleFinishLesson} />
            )}
          </View>
        ) : (
          // Mensagem caso não haja questões
          <Text style={styles.text}>Sem questões para esta lição.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
  
};
  

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
  backButtonText: { color: '#fff', fontSize: 16, marginLeft: 5 },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { paddingBottom: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  optionButton: { backgroundColor: '#f0f0f0', padding: 10, marginVertical: 5, borderRadius: 5 },
  optionText: { fontSize: 16 },
  errorMessage: { fontSize: 18, color: 'red', textAlign: 'center', marginVertical: 20 },
});

export default LessonScreen;
