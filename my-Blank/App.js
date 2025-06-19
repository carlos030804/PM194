/* ZONA 1: IMPORTACIONES */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import React, {useState} from 'react';

const Texto = ({style}) => {
  const [contenido, setContenido] = useState("Hola Mundo RNative"); 
  const actualizaTexto = () => {setContenido('ESTADO ACTUALIZADO DEL TEXT')}
  return (
    <View Style = {{margin: 10}}>
      <Text Style = {[styles.text, style]}>{contenido}</Text>
      <Button title = "Actualizar Texto" onPress = {actualizaTexto} color = "red"/>
    </View>
  )
}



// Zona 2: main
export default function App() {
  return (
    <View style={styles.container}>
      
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
