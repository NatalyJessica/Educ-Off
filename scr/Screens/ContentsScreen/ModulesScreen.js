import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import Icon from 'react-native-vector-icons/MaterialIcons';

const images = {
  Matemática: require('../../Assets/Matematica.jpg'),
  Biologia: require('../../Assets/Biologia.png'),
  Portugues: require('../../Assets/Portugues.png'),
};

const getImage = (subjectName) => images[subjectName] || require('../../Assets/Default.png');

const ModulesScreen = ({ route, navigation }) => {
  const { subjectName } = route.params; 
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontLoaded] = useFonts({ Lustria_400Regular });

  useEffect(() => {
    fetch(`http://localhost:8080/v1/modules/${subjectName}`)
      .then(response => response.json())
      .then(data => {
        setModules(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os módulos:', error);
        setError('Houve um problema ao buscar os módulos. Tente novamente mais tarde.');
        setLoading(false);
      });
  }, [subjectName]);

  const handleModulePress = (moduleName) => {
    navigation.navigate('LessonScreen', { moduleName });
  };
  
  const renderModule = ({ item }) => (
    <TouchableOpacity style={styles.moduleContainer} onPress={() => handleModulePress(item.module_name)}>
      <Image source={getImage(subjectName)} style={styles.moduleImage} />
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleName}>{item.module_name}</Text>
        {item.done && (
          <Icon name="check-circle" size={24} color="green" style={styles.doneIcon} />
        )}
      </View>
    </TouchableOpacity>
  );

  if (!fontLoaded) {
    return <Text>Carregando fonte...</Text>;
  }

  if (loading) {
    return <Text>Carregando módulos...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{subjectName.toUpperCase()}</Text>
      </View>
      <FlatList
        data={modules}
        renderItem={renderModule}
        keyExtractor={(item) => item.modules_Id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, // Adiciona espaço suficiente para o cabeçalho
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
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 130,
    fontFamily: 'Lustria_400Regular',
    textTransform: 'uppercase',
    paddingTop: 4,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 16,
    padding: 8,
  },
  moduleContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  moduleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  moduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  moduleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  doneIcon: {
    marginLeft: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default ModulesScreen;
