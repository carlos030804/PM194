/* ZONA 1: IMPORTACIONES */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import React, {useState} from 'react';

const Interruptor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);

return (
  <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text style={styles.text}>
      {isEnabled ? 'Activdo' : 'Desactivado'}
    </Text>
    <Switch 
      trackColor={{ false: '#767577', true: '#81boff' }}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />

  </View>
  )
}

// Zona 2: main
export default function App() {
  return (
    <View style={styles.container}>
        <Interruptor />
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
