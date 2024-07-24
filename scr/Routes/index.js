import {createNativeStackNavigator} from '@react-navigation/native-stack'

import WelcomeScreen from '../Screens/WelcomeScreens/index'
import LoginScreen from '../Screens/LoginScreen/index'
import PasswordRecovery from '../Screens/PasswordRecovery/index'
import RegisterScreen from '../Screens/RegisterScreen/index'
import MainScreen from '../Screens/MainScreen/index'
import ContentsScreen from '../Screens/ContentsScreen'
import DownloadScreen from '../Screens/DownloadScreens'
import ProfileScreen from '../Screens/ProfileScreen'
import DoubtsScreen from '../Screens/DoubtsScreen'




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
                name="Doubts"
                component={DoubtsScreen}
                options={{headerShown: false}}
            />

            
            

        </Stack.Navigator>
    )
}