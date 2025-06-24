import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Notecard from "./Components/Notecard";
import TrashPage from "./pages/TrashPage";
import Nav from "./Components/Nav";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
  const updatedNotes = [...notes, { ...note, trashed: false, pinned: false }];
  setNotes(updatedNotes);
};
  const saveNote = (index, updatedNote) => {
    const newNotes = [...notes];
    newNotes[index] = updatedNote;
    setNotes(newNotes);
  };

  const softDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes[index].trashed = true;
    setNotes(newNotes);
  };

  const restoreNote = (index) => {
    const newNotes = [...notes];
    newNotes[index].trashed = false;
    setNotes(newNotes);
  };

  const deleteNotePermanently = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const togglePin = (index) => {
  const newNotes = [...notes];
  newNotes[index].pinned = !newNotes[index].pinned;
  setNotes(newNotes);
};



  return (
    <Router>
      <Nav addNote={addNote} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-center text-2xl font-bold my-4">My Notes</h1>
              <div className="flex flex-wrap justify-center gap-4">
                {notes
                  .map((note, index) => ({ ...note, index }))
                  .filter((note) => !note.trashed)
                  .sort(
                    (a, b) =>
                      (b.pinned === true ? 1 : 0) - (a.pinned === true ? 1 : 0)
                  ) 
                  .map((note) => (
                    <Notecard
                      key={note.index}
                      index={note.index}
                      note={note}
                      onSave={saveNote}
                      onSoftDelete={softDeleteNote}
                      onTogglePin={togglePin} 
                    />
                  ))}
              </div>
            </>
          }
        />
        <Route
          path="/trash"
          element={
            <TrashPage
              notes={notes}
              onRestore={restoreNote}
              onDelete={deleteNotePermanently}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
