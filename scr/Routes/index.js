import {createNativeStackNavigator} from '@react-navigation/native-stack'

import WelcomeScreen from '../Screens/WelcomeScreens/index'
import LoginScreen from '../Screens/LoginScreen/index'
import PasswordRecovery from '../Screens/PasswordRecovery/index'
import RegisterScreen from '../Screens/RegisterScreen/index'
import MainScreen from '../Screens/MainScreen/index'
import ContentsScreen from '../Screens/ContentsScreen'
import DownloadScreen from '../Screens/DownloadScreens'
import ProfileScreen from '../Screens/ProfileScreen'
import Event from '../Screens/MainScreen/Event'
//import SubPages from '../Screens/ContentsScreen'
import MatematicaScreen from '../Screens/ContentsScreen/Materias/MatematicaScreen'
import PortuguesScreen from '../Screens/ContentsScreen/Materias/PortuguesScreen'
import BiologiaScreen from '../Screens/ContentsScreen/Materias/BiologiaScreen'
import SimuladoScreen from '../Screens/ContentsScreen/Materias/SimuladoScreen'
import ModulesScreen from '../Screens/ContentsScreen/ModulesScreen'
import LessonScreen from '../Screens/ContentsScreen/lessonScreen'


const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{headerShown: false}}
            />
             <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Recovery"
                component={PasswordRecovery}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Contents"
                component={ContentsScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Download"
                component={DownloadScreen}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />

          

            <Stack.Screen 
                name="Event" 
                component={Event} 
                options={{ title: 'Evento' }} 
            />  
             
             <Stack.Screen 
                name="PortuguesScreen" 
                component={PortuguesScreen} 
            />  
            
            <Stack.Screen 
                name="MatematicaScreen" 
                component={MatematicaScreen} 
            />

            <Stack.Screen 
                name="BiologiaScreen" 
                component={BiologiaScreen} 
            />

            <Stack.Screen 
                name="SimuladoScreen" 
                component={SimuladoScreen} 
            />
    
    <Stack.Screen
        name="ModulesScreen"
        component={ModulesScreen} // Nova tela de módulos
        options={{headerShown: false}}
      />
            <Stack.Screen
  name="LessonScreen"
  component={LessonScreen}
  options={{headerShown: false}}
/>

        </Stack.Navigator>
    )
}