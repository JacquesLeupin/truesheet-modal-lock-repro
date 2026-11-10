import React, { useRef } from 'react';
import { Button, Text, View } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';
import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Home() {
  const navigation = useNavigation<any>();
  const routes = useNavigationState(state =>
    state.routes.map(route => route.name).join(' > '),
  );
  const sheet = useRef<TrueSheet>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 16 }}>
      <Text style={{ textAlign: 'center' }}>Routes: {routes}</Text>
      <Button title="1. Open sheet" onPress={() => sheet.current?.present()} />
      <Button title="3. Open modal" onPress={() => navigation.push('Modal')} />
      <TrueSheet ref={sheet} detents={['auto']}>
        <View style={{ padding: 32 }}>
          <Button
            title="2. Close sheet and open modal"
            onPress={() => {
              sheet.current?.dismiss();
              navigation.navigate('Modal');
            }}
          />
        </View>
      </TrueSheet>
    </View>
  );
}

function Modal() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 16 }}>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>Modal</Text>
      <Button title="Close" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
