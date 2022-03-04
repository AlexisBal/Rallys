import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { Accueil } from '../screens/Accueil';
import { Scanner } from '../screens/Scanner';
import { AccueilRallye } from '../screens/AccueilRallye';
import { Regles } from '../screens/Regles';
import { RallyeQuestionInit } from '../screens/RallyeQuestionInit';
import { RallyeQuestion } from '../screens/RallyeQuestion';
import { ReponseScreen } from '../screens/ReponseScreen';
import { ScoreRallye } from '../screens/ScoreRallye';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStackScreen />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const MainStack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }}/>
      <MainStack.Screen name="Scanner" component={Scanner} options={{ title: 'QR Code', headerShown: false }}/>
      <MainStack.Screen name="AccueilRallye" component={AccueilRallye} options={{ title: 'Accueil Rallye', headerShown: false  }}/>
      <MainStack.Screen name="Regles" component={Regles} options={{ title: 'Règles', headerShown: false  }}/>
      <MainStack.Screen name="RallyeQuestionInit" component={RallyeQuestionInit} options={{ title: 'Question 1', gestureEnabled:false, headerLeft: () => null }}/>
      <MainStack.Screen name="RallyeQuestion" component={RallyeQuestion} options={({ route }) => ({ title: "Question "+route.params.id_question_suivante, gestureEnabled:false, headerLeft: () => null })}/>
      <MainStack.Screen name="ScoreRallye" component={ScoreRallye} options={{ title: 'Résultats', gestureEnabled:false, headerLeft: () => null }}/>
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false, presentation: "modal"}}
      />
      <RootStack.Screen name="ReponseScreen" component={ReponseScreen} options={{ headerShown: false, gestureEnabled:false, presentation: "modal"}}/>
    </RootStack.Navigator>
  );
}

