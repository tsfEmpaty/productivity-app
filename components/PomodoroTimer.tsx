import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(15);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            if (isBreak) {
              setMinutes(25);
              setIsBreak(false);
            } else {
              setMinutes(5);
              setIsBreak(true);
            }
            setSeconds(0);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, isBreak]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(15);
    setSeconds(0);
    setIsBreak(false);
  };
  const skipTimer = () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isBreak ? "Long Break" : "Pomodoro"}</Text>
      <Text style={styles.time}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <View style={styles.controls}>
        <Button title="Start" onPress={startTimer} />
        <Button title="Pause" onPress={pauseTimer} />
        <Button title="Reset" onPress={resetTimer} />
        <Button title="Skip" onPress={skipTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default PomodoroTimer;
