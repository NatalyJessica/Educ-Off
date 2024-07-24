import React, {useState} from "react";
import {view, Text, StyleSheet, Button, View} from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

// localidade do calendário 
LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const Calendario = () =>{
    const [selectedDate, setSelectedDate] = useState('');
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Calendar
            onPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
                [selectedDate]: {selected: true, selectedColor: 'blue', disableTouchEvent: true}
            }}
            theme={{
                todayBackgroundColor: '#00adf5', //cor de hoje
                todayTextColor: 'black'
            }}
            />
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>Evento para: {selectedDate}</Text>
                <Button
                    title="Adicionar evento"
                    onPress={()=> navigation.navigate('Event', {selectedDate})}/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    eventContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    eventText: {
      fontSize: 18,
      marginBottom: 10,
    },
  });
  export default Calendario;