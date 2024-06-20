import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useFonts, Montserrat_300Light } from "@expo-google-fonts/montserrat";

export default function ModalScreen() {
  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>F.A.Q.</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.subtitle}>
        Urfu Focus – это ваш идеальный инструмент для повышения продуктивности,
        который сочетает в себе возможности быстрых заметок и таймер Помидоро. С
        его помощью вы сможете эффективно организовать свои задачи, повысить
        концентрацию и достичь большего за меньшее время.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Montserrat_300Light",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#cbd5e1",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 34,
    marginLeft: 34,
  },
});
