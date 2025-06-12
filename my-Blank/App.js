// Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const Texto = () => {
  const [contenido, setContenido] = useState('Hola Mundo RNative');
  const actualizatexto = () => setContenido('Estado actualizado del texto');
  return (
    <Text onPress={actualizatexto}> {contenido} </Text>
  );
}

const Boton = () => {
  const [texto, setTexto] = useState('Tlabaja');
  const actualizaBoton = () => setTexto('Ya tlabajo');
  return (
    <Button title={texto} onPress={actualizaBoton} />
  );
}

// Zona 2: main
export default function App() {
  return (
    <View style={styles.container}>
      <Boton />
      <Texto />
      <Texto />
      <Texto />
      <StatusBar style="auto" />
    </View>
  );
}

// Zona 3: Estética del screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
