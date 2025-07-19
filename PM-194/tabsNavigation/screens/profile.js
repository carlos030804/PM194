import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={28} color="green" />
        <Text style={styles.title}>Perfil de usuario</Text>
         <Pressable style={[styles.button, styles.buttonProfileD]} onPress={() => navigation.navigate('Detail')}>
                <Text style={styles.buttonText}>Detalles de usuario</Text>
            </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
   button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonProfileD: {
    backgroundColor: '#007BFF', // Azul
  },
 
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});