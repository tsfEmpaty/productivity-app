// src/components/Notes.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Markdown from "react-native-markdown-display";
import { Appbar } from "react-native-paper";

interface Note {
  id: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  };

  const saveNotes = async (notes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes:", error);
    }
  };

  const handleSaveNote = () => {
    if (editingNoteId) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNoteId ? { ...note, content: currentNote } : note
      );
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setEditingNoteId(null);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    }
    setCurrentNote("");
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setCurrentNote(noteToEdit.content);
      setEditingNoteId(noteToEdit.id);
    }
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Notes" />
      </Appbar.Header>
      <TextInput
        style={styles.input}
        placeholder="Write your note in Markdown..."
        value={currentNote}
        onChangeText={setCurrentNote}
        multiline
      />
      <Button
        title={editingNoteId ? "Update Note" : "Save Note"}
        onPress={handleSaveNote}
      />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Markdown>{item.content}</Markdown>
            <View style={styles.noteButtons}>
              <Button title="Edit" onPress={() => handleEditNote(item.id)} />
              <Button
                title="Delete"
                onPress={() => handleDeleteNote(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  noteContainer: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  noteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Notes;
