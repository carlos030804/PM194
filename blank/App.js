import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptar, setAceptar] = useState(false);

  const Registro = () => {
    if (!nombre || !correo) {
      Alert.alert('Por favor completa todos los campos');
      return;
    }

    if (!aceptar) {
      Alert.alert('Debes aceptar los términos y condiciones');
      return;
    }

    Alert.alert('Registro exitoso', `Nombre: ${nombre}\nEmail: ${correo}`);
  };

  return (
    <ImageBackground source={require('./assets/fondo.png')} style={styles.fondo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Registro </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#ccc"
          onChangeText={setNombre}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#ccc"
          onChangeText={setCorreo}
          value={correo}
        />
        <View style={styles.terminos}>
          <Text style={{ color: 'white' }}>Aceptar términos y condiciones</Text>
          <Switch value={aceptar} onValueChange={setAceptar} />
        </View>
        <TouchableOpacity onPress={Registro}>
          <Text style={styles.boton}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex:1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
    padding: 20,
    margin: 20,
    borderRadious: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 22,
    textAlign:'center',
    marginButton:20,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    marginBottom: 15,
    paddingVertical: 5,
  },
  terminos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  boton: {
    color: '#4da6ff',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
