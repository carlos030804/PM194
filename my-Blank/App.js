//Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View} from 'react-native';


const Texto = ( props ) => {
  const {contenido}= props;
return (
  <Text> {contenido} </Text>
)

}

//zona 2: main
export default function App() {
  return (
    <View style={styles.container}>
      <Button title='Tlabaja!!'></Button>
      <Texto contenido="Hola"></Texto>
      <Texto contenido="mundo"></Texto>
      <Texto contenido="React Native"></Texto>
      <StatusBar style="auto" />
    </View>
  );
}


//Zona 3: Estetica del screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
