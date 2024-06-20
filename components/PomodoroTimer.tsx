import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            handleTimerCompletion();
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, isBreak]);

  const handleTimerCompletion = () => {
    if (isBreak) {
      setMinutes(25);
      setIsBreak(false);
    } else {
      setMinutes(5);
      setIsBreak(true);
    }
    setSeconds(0);
    setIsActive(false);
  };

  const startTimer = () => setIsActive(true);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };
  const skipTimer = () => {
    handleTimerCompletion();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isBreak ? "Break" : "Pomodoro"}</Text>
      <Text style={styles.time}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/images/reset.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={startTimer}
          style={[styles.button, styles.playButton]}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/images/play-fill.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={skipTimer}
          style={[styles.button, styles.skipButton]}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/images/fast-forward-fill.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    color: "#DDD",
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
    color: "#FFF",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2B4E94",
    borderRadius: 50,
  },
  playButton: {
    backgroundColor: "#4176E0",
  },
  skipButton: {
    backgroundColor: "#2B4E94",
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default PomodoroTimer;
