import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Notes from "../../components/Notes";

export default function QuickNotesTab() {
  return (
    <PaperProvider>
      <Notes />
    </PaperProvider>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
