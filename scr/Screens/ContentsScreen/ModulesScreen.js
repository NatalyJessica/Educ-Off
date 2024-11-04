import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Lustria_400Regular } from '@expo-google-fonts/lustria';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';


import * as Sharing from 'expo-sharing';



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

  const handleDownloadPress = async (moduleName) => {
    try {
      console.log(`Iniciando o download do módulo: ${moduleName}`);
  
      // Faz a requisição com o responseType 'blob'
      const response = await axios.get(`http://localhost:8080/v1/pdfs/${moduleName}`, {
        responseType: 'blob',
      });
      console.log(`Resposta recebida:`, response);
  
      const blob = new Blob([response.data]);
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        const base64data = reader.result;
        const fileUri = FileSystem.documentDirectory + `${moduleName}.pdf`;
        console.log(`Caminho do arquivo: ${fileUri}`);
  
        try {
          // Salva o arquivo no sistema de arquivos
          await FileSystem.writeAsStringAsync(fileUri, base64data.split(',')[1], {
            encoding: FileSystem.EncodingType.Base64,
          });
          
          alert(`Módulo ${moduleName} baixado com sucesso!`);
  
          // Compartilha o arquivo PDF
          await Sharing.shareAsync(fileUri);
        } catch (writeError) {
          console.error('Erro ao salvar o arquivo:', writeError);
          alert(`Houve um problema ao salvar o arquivo: ${writeError.message}`);
        }
      };
  
      reader.readAsDataURL(blob); // Converte o blob para base64
    } catch (error) {
      console.error('Erro ao baixar o módulo:', error);
      alert(`Houve um problema ao baixar o módulo: ${error.message}`);
    }
  };
  const renderModule = ({ item }) => (
    <TouchableOpacity style={styles.moduleContainer} onPress={() => handleModulePress(item.module_name)}>
      <Image source={getImage(subjectName)} style={styles.moduleImage} />
      <View style={styles.moduleInfo}>
        <Text style={styles.moduleName}>{item.module_name}</Text>
        {item.done && (
          <Icon name="check-circle" size={24} color="green" style={styles.doneIcon} />
        )}
        <TouchableOpacity onPress={() => handleDownloadPress(item.module_name)} style={styles.downloadButton}>
          <Icon name="file-download" size={24} color="#333" />
        </TouchableOpacity>
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
    flex: 1,
  },
  doneIcon: {
    marginLeft: 5,
  },
  downloadButton: {
    marginLeft: 10,
    padding: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default ModulesScreen;
