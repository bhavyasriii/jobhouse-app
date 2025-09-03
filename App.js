// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AddJobScreen from './screens/AddJobScreen';
import EditJobScreen from './screens/EditJobScreen';
import HomeScreen from './screens/HomeScreen';
import { JobProvider } from './utils/JobContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <JobProvider>
        <View style={{ flex: 1, height: '100vh' }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Add Job" component={AddJobScreen} />
              <Stack.Screen name="Edit Job" component={EditJobScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </JobProvider>
    </PaperProvider>
  );
}
