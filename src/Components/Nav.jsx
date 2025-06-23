import { Link } from "react-router-dom";

function Nav({ addNote }) {
  return (
    <nav className="bg-gray-800 text-white p-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">Notes App</h1>
      <div className="flex items-center gap-4">
        <Link to="/trash" className="hover:underline text-sm">🗑️ Trash</Link>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded"
          onClick={() =>
            addNote({
              title: "",
              content: "",
              trashed: false,
            })
          }
        >
          ➕ Add Note
        </button>
      </div>
    </nav>
  );
}

export default Nav;
