import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
// import { useFonts, Montserrat_300Light } from '@expo-google-fonts/montserrat'
// import styled from 'styled-components';


export default function ModalScreen() {
  // let [fontsLoaded] = useFonts({
  //   Montserrat_300Light,
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F.A.Q.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>Coded by tsfEmpaty</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat_300Light',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
});
