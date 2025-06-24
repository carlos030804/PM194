import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady , SetAppready] = useState(false);

  useEffect(() => {
    setTimeout (async() => {
    
      SetAppready(true);
      await SplashScreen.hideAsync();
    }, 2000); 
  }, []);

}

/* Estilos */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 17,
    color: '#333',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  input: {
    height: 44,
    borderColor: '#bbb',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 15,
  },
});