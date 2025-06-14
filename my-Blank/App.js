// Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const Texto = ({style}) => {
  const [contenido, setContenido] = useState('Hola Mundo RNative');
  const actualizatexto = () => setContenido('Estado actualizado del texto');
  return (
    <Text style={[styles.text, style]} onPress={actualizatexto}> {contenido} </Text>
  );
}

// Zona 2: main
export default function App() {
  return (
    <View style={styles.container}>
      <Texto style={styles.red}> </Texto>
      <Texto style={styles.blue}> </Texto>
      <Texto style={styles.green}> </Texto>
      <StatusBar style="auto" />
    </View>
  );
}

// Zona 3: Estética del screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#778',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text:{
    color: 'white',
    fontSize: 27,
  },
  red:{backgroundColor: 'red'},
  blue:{backgroundColor: 'blue'},
  green:{backgroundColor: 'green'},
});
