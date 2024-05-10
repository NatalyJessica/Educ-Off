import {createNativeStackNavigator} from '@react-navigation/native-stack'

import WelcomeScreen from '../Screens/WelcomeScreens/index'
import LoginScreen from '../Screens/LoginScreen/index'
import PasswordRecovery from '../Screens/PasswordRecovery/index'
import RegisterScreen from '../Screens/RegisterScreen/index'
import MainScreen from '../Screens/MainScreen/index'




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

            
            

        </Stack.Navigator>
    )
}