import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Markdown from "react-native-markdown-display";

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
      <TextInput
        style={styles.input}
        placeholder="Write your note in Markdown..."
        placeholderTextColor="#d8dee9"
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
            <Markdown style={markdownStyles}>{item.content}</Markdown>
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
    backgroundColor: "#2E3440",
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#4C566A",
    color: "#ECEFF4", // Белый цвет текста
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

// Стили для Markdown
const markdownStyles = {
  body: {
    color: "#ECEFF4", // Белый цвет текста для заметок
  },
  blockquote: {
    backgroundColor: "#4C566A",
    color: "#ECEFF4",
    padding: 10,
    borderRadius: 5,
  },
  code_block: {
    backgroundColor: "#4C566A",
    color: "#ECEFF4",
    padding: 10,
    borderRadius: 5,
  },
  code_inline: {
    backgroundColor: "#4C566A",
    color: "#ECEFF4",
    padding: 5,
    borderRadius: 5,
  },
  link: {
    color: "#88C0D0", // Цвет ссылок
  },
  pre: {
    backgroundColor: "#4C566A",
    borderRadius: 5,
    padding: 10,
  },
  fence: {
    backgroundColor: "#4C566A",
    color: "#ECEFF4",
    borderRadius: 5,
    padding: 10,
  },
};

export default Notes;
