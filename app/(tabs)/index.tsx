import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'

import TimerBar from "@/components/TimerBar";
import PomodoroTimer from "@/components/PomodoroTimer";

export default function PomodoroTimerTab() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Montserrat_600SemiBold,
  });

  return (
    <View style={styles.container}>
      <PomodoroTimer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
