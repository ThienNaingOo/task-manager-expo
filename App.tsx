import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Create from './src/screens/Create';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: true}}>
          <Stack.Screen name="home" component={Home} options={{title: 'Task Manager'}}/>
          <Stack.Screen name="create" component={Create} options={{title: 'Edit Task'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}