import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Event = ({ navigation }) => {
  const route = useRoute();
  const { date } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Adicionar evento para: {date}</Text>
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Event;
