
import { Link } from "react-router-dom";

function TrashPage({ notes, onRestore, onDelete }) {
  const trashedNotes = notes.map((note, index) => ({ ...note, index })).filter(n => n.trashed);

  return (
    <div>
      <h2 className="text-center text-xl font-semibold mt-6"> Trashed Notes</h2>
      <div className="text-center my-4">
        <Link to="/" className="text-blue-600 underline">← Back to Notes</Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {trashedNotes.length > 0 ? (
          trashedNotes.map(note => (
            <div key={note.index} className="bg-gray-100 shadow-md p-4 rounded w-80">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-700">{note.content}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => onRestore(note.index)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  🔁 Restore
                </button>
                <button
                  onClick={() => onDelete(note.index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No trashed notes.</p>
        )}
      </div>
    </div>
  );
}

export default TrashPage;
