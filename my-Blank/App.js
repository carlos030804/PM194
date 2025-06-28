import { StyleSheet, View, Text, ImageBackground,ScrollView } from 'react-native';
import {useState, useEffect} from 'react';

export default function App(){
  return(
    <ScrollView contentContainerStyle= {styles.background} showsVerticalScrollIndicator={false} horizontal={true}>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
      <Text>Hola Mundo</Text>
    </ScrollView>
  )
}

// 4. Estilos simples
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
  }
});