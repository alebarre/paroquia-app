import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [fontsLoaded] = useFonts({
    'SeoulHangang-CEB': require('./assets/fonts/seoulhangang-ceb.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (!fontsLoaded || loadingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isVerified = !!currentUser && currentUser.emailVerified;

  return (
    <NavigationContainer>
      {isVerified ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}