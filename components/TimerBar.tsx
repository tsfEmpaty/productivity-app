import * as React from "react";
import {
  Image,
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import PomodoroTimer from "./PomodoroTimer";

const TimerBar = () => {
  return (
    <View style={styles.timerBar}>
      <View style={[styles.button, styles.buttonSpaceBlock]}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/images/dots-three-outline-fill.png")}
        />
      </View>
      <View style={[styles.button1, styles.buttonFlexBox]}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/images/play-fill.png")}
        />
      </View>
      <View style={[styles.button2, styles.buttonFlexBox]}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/images/fast-forward-fill.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSpaceBlock: {
    padding: 24,
    backgroundColor: "#2B4E94",
    borderRadius: 24,
  },
  buttonFlexBox: {
    marginLeft: 16,
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  button: {
    justifyContent: "center",
    padding: 24,
    overflow: "hidden",
    borderRadius: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  button1: {
    borderRadius: 32,
    backgroundColor: "#4176E0",
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  button2: {
    padding: 24,
    backgroundColor: "#2B4E94",
    borderRadius: 24,
    marginLeft: 16,
  },
  timerBar: {
    flex: 1,
    width: "100%",
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
});

export default TimerBar;
