import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        <Ionicons name="home" size={28} color="green" />
      <Text style={styles.title}>Bienvenido a la pantalla principal</Text>


      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color:'green'
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonProfile: {
    backgroundColor: '#007BFF', // Azul
  },
  buttonSettings: {
    backgroundColor: '#FF8800', // Naranja
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});