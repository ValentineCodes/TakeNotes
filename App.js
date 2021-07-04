import React from 'react';
import {
  SegmentedControlIOSComponent,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import ViewNoteScreen from './src/screens/ViewNoteScreen';
import ViewCategoryScreen from './src/screens/ViewCategoryScreen';
import ViewCategoryNoteScreen from './src/screens/ViewCategoryNoteScreen';
import {themeColor} from './styles';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={themeColor} />
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewNoteScreen"
          component={ViewNoteScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewCategoryScreen"
          component={ViewCategoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewCategoryNoteScreen"
          component={ViewCategoryNoteScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
