import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import Icon from 'react-native-vector-icons/FontAwesome';

const images = {
  Matemática: require('../../Assets/Matematica.jpg'),
  Biologia: require('../../Assets/Biologia.png'),
  Portugues: require('../../Assets/Portugues.png'),
};

const getImage = (name) => images[name] || require('../../Assets/Default.png');

const MatematicaScreen = ({ navigation }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [fontLoaded] = useFonts({ Lustria_400Regular });

  useEffect(() => {
    fetch('http://localhost:8080/v1/subjects')
      .then(response => response.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as matérias:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSubjectPress = (subjectName) => {
    navigation.navigate('ModulesScreen', { subjectName });
  };

  const renderSubject = ({ item }) => (
    <TouchableOpacity style={styles.subjectContainer} onPress={() => handleSubjectPress(item.name)}>
      <Image source={getImage(item.name)} style={styles.subjectImage} />
      <Text style={styles.subjectName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (!fontLoaded) {
    return <Text>Carregando fonte...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>MATÉRIAS</Text>
      </View>
      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.subject_id.toString()}
        contentContainerStyle={styles.flatListContent} // Adiciona padding no conteúdo da lista
      />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    backgroundColor: 'rgb(72,83,227)',
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    zIndex: 1, 
    elevation: 5, 
    position: 'relative', 
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 130,
    fontFamily: 'Lustria_400Regular',
    textTransform: 'uppercase',
    paddingTop:4
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,
    padding: 8,
  },
  subjectContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  subjectImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  flatListContent: {
    paddingBottom: 20, // Espaço extra no fundo, se necessário
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribui os botões igualmente
    paddingHorizontal: 18, // Espaçamento horizontal
    paddingVertical: 20, // Espaçamento vertical
    backgroundColor: 'white', // Cor de fundo do container
    shadowColor: '#000', // Cor da sombra
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    shadowOffset: {
      width: 0,
      height: -2, // Ajuste para sombra ficar na parte inferior
    },
    elevation: 5, // Elevação da sombra no Android
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  
  button: {
    backgroundColor: 'white',
  },
});

export default MatematicaScreen;
